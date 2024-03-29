const stripe = require('../config/stripe')

const PaymentService = {
  createPaymentSession: async function (email, product, offerId, creatorId) {
    try {
      const customer = await stripe.customers.create({
        email,
      })
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer.id,
        line_items: [
          {
            price: product.priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        cancel_url: process.env.STRIPE_CANCEL_URL,
        success_url: process.env.STRIPE_SUCCESS_URL,
        payment_intent_data: {
          metadata: {
            offerId,
            creatorId,
          },
        },
      })
      return session.id
    } catch (error) {
      throw new Error(error)
    }
  },
  listenForPaymentSuccess: async function (stripePayload, stripeSignature) {
    let event
    try {
      event = stripe.webhooks.constructEvent(
        stripePayload,
        stripeSignature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
      switch (event.type) {
        case 'checkout.session.completed': {
          const paymentIntent = await stripe.paymentIntents.retrieve(
            event.data.object.payment_intent
          )
          const { receipt_url, created, amount } = paymentIntent.charges.data[0]
          const { offerId, creatorId } = paymentIntent.metadata
          return {
            offerId,
            creatorId,
            receiptUrl: receipt_url,
            created,
            amount,
          }
        }
        default:
          console.log(`Unhandled event type ${event.type}`)
      }
    } catch (error) {
      throw new Error(error)
    }
  },
}

module.exports = PaymentService
