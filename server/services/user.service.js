const Offer = require('../models/Offer')
const User = require('../models/Employer')
const googleFileUpload = require('../utils/googleFileUpload')

const UserService = {
  getUserOffers: async function (userId) {
    try {
      return await Offer.find({ creator: userId })
    } catch (error) {
      throw new Error(error)
    }
  },
  updateUser: async function (userId, userInfo) {
    try {
      let avatarUrl
      if (userInfo.avatar) {
        avatarUrl = await googleFileUpload(userInfo.avatar)
        userInfo = { ...userInfo, avatarUrl }
      }
      await User.findByIdAndUpdate(userId, userInfo, {
        runValidators: true,
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  getUsers: async function (queries) {
    try {
      const users = await User.find(
        queries,
        '-password -invoices -resetPasswordToken'
      )
      return users
    } catch (error) {
      throw new Error(error)
    }
  },
  getUser: async function (userId) {
    try {
      const user = await User.findById(
        userId,
        '-password -invoices -resetPasswordToken'
      )
      return user
    } catch (error) {
      throw new Error(error)
    }
  },
  addInvoice: async function (userId, receiptUrl, amount, created) {
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { invoices: { receiptUrl, amount, created: created * 1000 } },
      })
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = UserService
