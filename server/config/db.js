const mongoose = require('mongoose')
const ErrorResponse = require('../utils/errorResponse')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    })
  } catch (error) {
    throw new ErrorResponse('Internal Server Error', 500)
  }
}

module.exports = dbConnection
