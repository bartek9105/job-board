const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  durationDays: {
    type: Number,
    required: true,
  },
  promotionDays: {
    type: Number,
    required: true,
  },
  priceId: {
    type: String,
  },
})

module.exports = mongoose.model('Product', productSchema)
