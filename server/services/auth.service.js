const Employer = require('../models/Employer')
const hash = require('../utils/hash')
const slugify = require('slugify')

const AuthService = {
  register: async function (userCredentials) {
    const { name, email, password } = userCredentials
    const hashedPassword = await hash(password)

    const slug = slugify(name, {
      lower: true,
    })

    try {
      const user = await new Employer({
        name,
        email,
        password: hashedPassword,
        slug,
      })
      await user.save()
      return user
    } catch (error) {
      throw new Error(error)
    }
  },
  userExists: async function (email) {
    try {
      const user = await Employer.findOne({ email })
      return user
    } catch (error) {
      throw new Error(error)
    }
  },
  getMe: async function (userId) {
    try {
      const me = await Employer.findById(
        userId,
        '-password -resetPasswordToken'
      )
      return me
    } catch (error) {
      throw new Error(error)
    }
  },
  updatePasswordToken: async function (userId, hashedPasswordToken) {
    try {
      await Employer.findByIdAndUpdate(
        { _id: userId },
        { resetPasswordToken: hashedPasswordToken }
      )
    } catch (error) {
      throw new Error(error)
    }
  },
  updatePassword: async function (userId, password) {
    try {
      await Employer.updateOne({ _id: userId, password })
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = AuthService
