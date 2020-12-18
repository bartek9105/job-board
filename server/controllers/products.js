const Product = require('../models/Product')

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.send(products)
  } catch (error) {
    console.log(error)
  }
}

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.find({ _id: req.body.productId })
    req.body.product = product
    next()
  } catch (error) {
    console.log(error)
  }
}
