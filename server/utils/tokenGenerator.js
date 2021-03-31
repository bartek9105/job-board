const crypto = require('crypto')

const tokenGenerator = () => crypto.randomBytes(20).toString('hex')

module.exports = tokenGenerator
