const Product = require('../models/Product')

const ProductService = {
  getProducts: async function () {
    try {
      return await Product.find()
    } catch (error) {
      throw new Error(error)
    }
  },
  getProduct: async function (productId) {
    try {
      const product = await Product.findById(productId)
      return product
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = ProductService
