const jwt = require('jsonwebtoken')

exports.isAuth = async (req, res, next) => {
  const { token } = req.cookies
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    req.creatorId = decodedToken.id
    next()
  } catch (error) {
    next(error)
  }
}
