const bcrypt = require('bcryptjs')

const hash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    return hashed
  } catch (error) {
    console.log(error)
  }
}

module.exports = hash
