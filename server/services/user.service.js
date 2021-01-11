const Offer = require('../models/Offer')

const UserService = {
  getUserOffers: async function (userId) {
    try {
      return await Offer.find({ creator: userId })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = UserService
