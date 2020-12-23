const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')

exports.isAuth = async (req, res, next) => {
  let token
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split('; ')
    token = cookies.find((cookie) => cookie.includes('token'))
    token = token.split('=')[1]
    if (!token) {
      next(new ErrorResponse('Not authorized', 401))
    }
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
      req.creatorId = decodedToken.id
      next()
    } catch (error) {
      next(new ErrorResponse('Not authorized', 401))
    }
  }
}
