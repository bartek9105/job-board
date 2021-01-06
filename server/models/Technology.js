const mongoose = require('mongoose')

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
  },
})

module.exports = mongoose.model('Technology', technologySchema)
