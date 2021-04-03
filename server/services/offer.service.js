const Offer = require('../models/Offer')
const setOfferExpiryDate = require('../utils/setOfferExpiryDate')

const OfferService = {
  getOfferById: async function (offerId) {
    try {
      const offer = await Offer.findById(offerId).populate('creator')
      return offer
    } catch (error) {
      throw new Error(error)
    }
  },
  addOffer: async function (offer) {
    const { price, duration } = offer.product[0]
    try {
      let newOffer
      if (price === 0) {
        newOffer = new Offer({
          status: 'free',
          expireAt: setOfferExpiryDate(7),
          ...offer,
        })
        await newOffer.save()
        return newOffer
      } else if (duration === '15d') {
        newOffer = new Offer({
          status: 'unpaid',
          expireAt: setOfferExpiryDate(15),
          isPromoted: true,
          promotionExpireAt: setOfferExpiryDate(7),
          ...offer,
        })
        await newOffer.save()
        return newOffer
      } else if (duration === '30d') {
        newOffer = new Offer({
          status: 'unpaid',
          expireAt: setOfferExpiryDate(30),
          isPromoted: true,
          promotionExpireAt: setOfferExpiryDate(15),
          ...offer,
        })
        await newOffer.save()
        return newOffer
      }
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
        promotionExpireAt: { $lt: new Date().toISOString() },
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
