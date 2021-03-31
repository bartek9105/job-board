const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = new ErrorResponse(message, 404)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse('Token expired', 401)
  }

  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Not authorized', 401)
  }

  res.status(error.statusCode || 500).send({
    error: error.message || 'Server Error',
  })
}

module.exports = errorHandler
