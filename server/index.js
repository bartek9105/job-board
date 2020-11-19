const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const errorHandler = require('./middleware/error')
const dbConnection = require('./config/db')

dotenv.config({ path: './config/.env' })

const stripe = require('./config/stripe')
dbConnection()

const app = express()

app.use(cors())
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))

const offers = require('./routes/offers')
const auth = require('./routes/auth')
const products = require('./routes/products')
const payments = require('./routes/payments')

app.use('/api/v1/offers', offers)
app.use('/api/v1/auth', auth)
app.use('/api/v1/products', products)
app.use('/api/v1/payments', payments)

const Offer = require('./models/Offer')

app.post('/webhook', async (req, res, next) => {
    const sig = req.headers['stripe-signature']
    let event
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
        switch (event.type) {
            case 'checkout.session.completed':
                const paymentIntent = await stripe.paymentIntents.retrieve(
                    event.data.object.payment_intent                    
                )
                const offerId = paymentIntent.metadata.offerId
                console.log(offerId)
                await Offer.findByIdAndUpdate({ _id: offerId }, { "status": "paid" })
                break;
            default:
                console.log(`Unhandled event type ${event.type}`)
        }
    } catch (error) {
        console.log(error)
    } 
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT} in ${process.env.NODE_ENV} mode`))