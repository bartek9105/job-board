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
      await User.findByIdAndUpdate(userId, userInfo, {
        runValidators: true,
      })
    } catch (error) {
      console.log(error)
    }
  },
  uploadUserAvatar: async function ({ name, mimetype, data }) {
    const storage = new Storage({
      keyFilename: './config/google-credentials.json',
    })
    try {
      const bucket = await storage.bucket(process.env.GCS_BUCKET)
      const blob = bucket.file(name)
      const stream = blob.createWriteStream({
        metadata: {
          contentType: mimetype,
        },
      })

      stream.on('error', (err) => console.log(err))
      stream.end(data)
      return `https://storage.cloud.google.com/${process.env.GCS_BUCKET}/${name}`
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = UserService
