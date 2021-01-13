const mongoose = require('mongoose')

const benefitSchema = new mongoose.Schema({
  name: {
    type: String,
  },
})

module.exports = mongoose.model('Benefit', benefitSchema)
