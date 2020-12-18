const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res) => {
  let error = { ...err }
  error.message = err.message

  console.log(err)

  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = new ErrorResponse(message, 404)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).send({
    error: error.message || 'Server Error',
  })
}

module.exports = errorHandler
