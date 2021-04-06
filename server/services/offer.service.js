const Offer = require('../models/Offer')
const setOfferExpiryDate = require('../utils/setOfferExpiryDate')

const OfferService = {
  getOfferById: async function (offerId) {
    try {
      const offer = await Offer.findById(offerId).populate(
        'creator',
        '-resetPasswordToken -password -invoices'
      )
      return offer
    } catch (error) {
      throw new Error(error)
    }
  },
  addFreeOffer: async function (offer) {
    const { product } = offer
    try {
      const freeOffer = new Offer({
        isPromoted: false,
        expiresAt: setOfferExpiryDate(product.durationDays),
        ...offer,
      })
      await freeOffer.save()
    } catch (error) {
      throw new Error(error)
    }
  },
  addPaidOffer: async function (offer) {
    const { product } = offer
    try {
      const paidOffer = new Offer({
        isPromoted: true,
        expiresAt: setOfferExpiryDate(product.durationDays),
        promotionExpiresAt: setOfferExpiryDate(product.promotionDays),
        ...offer,
      })
      await paidOffer.save()
      return paidOffer._id
    } catch (error) {
      throw new Error(error)
    }
  },
  editOffer: async function (offerId, offer) {
    try {
      const editedOffer = await Offer.findByIdAndUpdate(offerId, offer, {
        runValidators: true,
      })
      return editedOffer
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteOffer: async function (offerId) {
    try {
      const offer = await Offer.findByIdAndRemove(offerId)
      return offer
    } catch (error) {
      throw new Error(error)
    }
  },
  validateOfferPromotionStatus: async function () {
    try {
      await Offer.find({
        promotionExpiresAt: { $lt: new Date().toISOString() },
      }).updateMany({ isPromoted: false })
    } catch (error) {
      throw new Error(error)
    }
  },
  updateOfferPaymentStatus: async function (offerId) {
    try {
      const offer = await Offer.findByIdAndUpdate(
        { _id: offerId },
        { status: 'paid' }
      )
      return offer
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = OfferService
