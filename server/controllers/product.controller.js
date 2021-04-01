const { getProduct, getProducts } = require('../services/product.service')
const ErrorResponse = require('../utils/errorResponse')

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProducts()
    res.status(200).send({ data: products })
  } catch (error) {
    next(error)
  }
}

exports.getProduct = async (req, res, next) => {
  const { productId } = req.body
  try {
    const product = await getProduct(productId)
    if (!product) {
      return next(new ErrorResponse('Product not found', 404))
    }
    req.body.product = product
    next()
  } catch (error) {
    next(error)
  }
}
