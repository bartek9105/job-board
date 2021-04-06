const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message
  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse('Token expired', 401)
  }

  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Not authorized', 401)
  }

  if (err.name === 'ValidationError') {
    error = new ErrorResponse(
      error.message.map((el) => el.message),
      400
    )
  }

  res.status(error.statusCode || 500).send({
    error: error.message || 'Server error, please try again later',
  })
}

module.exports = errorHandler
