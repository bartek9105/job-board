const { getProduct, getProducts } = require('../services/product.service')

exports.getProducts = async (req, res) => {
  try {
    const products = await getProducts()
    res.send(products)
  } catch (error) {
    console.log(error)
  }
}

exports.getProduct = async (req, res, next) => {
  const { productId } = req.body.productId
  try {
    const product = await getProduct(productId)
    req.body.product = product
    next()
  } catch (error) {
    console.log(error)
  }
}
