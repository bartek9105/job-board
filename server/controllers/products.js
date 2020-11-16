const Product = require('../models/Product')

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.send(products)
    } catch (error) {
        console.log(error)
    }
}