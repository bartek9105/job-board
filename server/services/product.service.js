const Product = require('../models/Product')

const ProductService = {
  getProducts: async function () {
    try {
      return await Product.find()
    } catch (error) {
      console.log(error)
    }
  },
  getProduct: async function (productId) {
    try {
      return Product.find({ _id: productId })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = ProductService
