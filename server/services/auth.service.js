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
      console.log(error)
    }
  },
  userExists: async function (email) {
    try {
      const user = await Employer.findOne({ email })
      return user
    } catch (error) {
      console.log(error)
    }
  },
  getMe: async function (userId) {
    try {
      const me = await Employer.findById(userId, '-password -_id')
      return me
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = AuthService
