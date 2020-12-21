const jwt = require('jsonwebtoken')

exports.signJwtToken = (userId, secret, expiresIn) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    secret,
    { expiresIn: expiresIn }
  )
  return token
}
