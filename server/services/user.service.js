const Offer = require('../models/Offer')
const User = require('../models/Employer')
const { Storage } = require('@google-cloud/storage')

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
        avatarUrl = await UserService.uploadUserAvatar(userInfo.avatar)
        userInfo = { ...userInfo, avatarUrl }
      }
      await User.findByIdAndUpdate(userId, userInfo, {
        runValidators: true,
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  uploadUserAvatar: async function (avatar) {
    const storage = new Storage({
      keyFilename: './config/google-credentials.json',
    })
    try {
      const bucket = await storage.bucket(process.env.GCS_BUCKET)
      const fileName = `${avatar.upload.uuid}-${avatar.upload.filename}`
      const blob = bucket.file(fileName)
      const stream = blob.createWriteStream()

      stream.on('error', (err) => console.log(err))
      const imgUrl = avatar.dataURL.split(',')[1]
      const imgBuffer = Buffer.from(imgUrl, 'base64')
      stream.end(imgBuffer)
      return `https://storage.cloud.google.com/${process.env.GCS_BUCKET}/${fileName}`
    } catch (error) {
      throw new Error(error)
    }
  },
  getUsers: async function (queries) {
    try {
      const users = await User.find(queries, '-password')
      return users
    } catch (error) {
      throw new Error(error)
    }
  },
  getUser: async function (userId) {
    try {
      const user = await User.findById(userId)
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
