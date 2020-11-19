const Product = require('../models/Product')
const stripe = require('../config/stripe')

exports.createPaymentSession = async (req, res, next) => {
    const { email, productId } = req.body    
    try {
        // Get product price
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
            success_url: 'http://localhost:8080',
            payment_intent_data: {
                metadata: {
                    offerId: res.locals.savedOffer._id.toString()
                }
            }   
        })
        res.json({ id: session.id })
    } catch (error) {
        console.log(error)
    }
}

exports.listenForPaymentSuccess = async (req, res, next) => {
    const signature = req.headers['stripe-signature']
    let event
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)
        switch (event.type) {
            case 'checkout.session.completed':
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    event.data.object.payment_intent                    
                )
                const offerId = paymentIntent.metadata.offerId
                req.body.offerId = offerId
                break;
            default:
                console.log(`Unhandled event type ${event.type}`)
        }
        next()
    } catch (error) {
        console.log(error)
    } 
}