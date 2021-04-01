const Offer = require('../models/Offer')
const setOfferExpiryDate = require('../utils/setOfferExpiryDate')
const slugify = require('slugify')

const OfferService = {
  getOfferById: async function (offerId) {
    try {
      const offer = await Offer.find({ _id: offerId }).populate('creator')
      return offer
    } catch (error) { }
  },
  addOffer: async function (offer) {
    const [price, duration] = offer.product[0]

    offer.slug = slugify(offer.title, {
      lower: true,
    })

    try {
      let newOffer = { creator: offer.creatorId, ...offer }

      if (price === 0) {
        newOffer = new Offer({
          status: 'free',
          expireAt: setOfferExpiryDate(7),
          ...newOffer,
        })
      } else if (duration === '15d') {
        newOffer = new Offer({
          status: 'unpaid',
          expireAt: setOfferExpiryDate(15),
          isPromoted: true,
          promotionExpireAt: setOfferExpiryDate(7),
          ...newOffer,
        })
      } else if (duration === '30d') {
        newOffer = new Offer({
          status: 'unpaid',
          expireAt: setOfferExpiryDate(30),
          isPromoted: true,
          promotionExpireAt: setOfferExpiryDate(15),
          ...newOffer,
        })
      }
      newOffer.save()
      return newOffer
    } catch (error) {
      console.log(error)
    }
  },
  editOffer: async function (offerId, offer) {
    try {
      const editedOffer = await Offer.findByIdAndUpdate(offerId, offer, {
        runValidators: true,
      })
      return editedOffer
    } catch (error) {
      console.log(error)
    }
  },
  deleteOffer: async function (offerId) {
    try {
      const offer = await Offer.findByIdAndRemove(offerId)
      return offer
    } catch (error) {
      console.log(error)
    }
  },
  validateOfferPromotionStatus: async function () {
    await Offer.find({
      promotionExpireAt: { $lt: new Date().toISOString() },
    }).updateMany({ isPromoted: false })
  },
  updateOfferPaymentStatus: async function (offerId) {
    try {
      const offer = await Offer.findByIdAndUpdate(
        { _id: offerId },
        { status: 'paid' }
      )
      return offer
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = OfferService
