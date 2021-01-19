const Offer = require('../models/Offer')
const User = require('../models/Employer')

const UserService = {
  getUserOffers: async function (userId) {
    try {
      return await Offer.find({ creator: userId })
    } catch (error) {
      console.log(error)
    }
  },
  updateUser: async function (userId, userInfo) {
    try {
      await User.findByIdAndUpdate(userId, userInfo, {
        runValidators: true,
      })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = UserService
