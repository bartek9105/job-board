const Product = require('../models/Product')
const stripe = require('../config/stripe')

exports.offerPayment = async (req, res, next) => {
    const { email, productId } = req.body
    try {
        const foundProduct = await Product.findById(productId)
        const customer = await stripe.customers.create({
            email: email
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer: customer.id,
            line_items: [
              {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: foundProduct.name
                    },
                    unit_amount: foundProduct.price
                },
                quantity: 1
              }
            ],
            mode: 'payment',
            cancel_url: 'http://localhost:8080/post-offer',
            success_url: 'http://localhost:8080'
          })
        res.json({ id: session.id });
    } catch (error) {
        console.log(error)
    }
}