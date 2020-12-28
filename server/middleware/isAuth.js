const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')

exports.isAuth = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    next(new ErrorResponse('Not authorized', 401))
  }
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    req.creatorId = decodedToken.id
    next()
  } catch (error) {
    next(error)
  }
}
