const Offer = require('../models/Offer')

exports.getUserOffers = async (req, res, next) => {
  try {
    const offers = await Offer.find({ creator: req.creatorId })
    res.send(offers)
  } catch (error) {
    next(error)
  }
}
