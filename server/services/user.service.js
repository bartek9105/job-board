const Offer = require('../models/Offer')
const User = require('../models/Employer')
const { Storage } = require('@google-cloud/storage')

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
      const avatarUrl = await UserService.uploadUserAvatar(userInfo.avatar)
      userInfo = { ...userInfo, avatarUrl }
      await User.findByIdAndUpdate(userId, userInfo, {
        runValidators: true,
      })
    } catch (error) {
      console.log(error)
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
      console.log(error)
    }
  },
}

module.exports = UserService
