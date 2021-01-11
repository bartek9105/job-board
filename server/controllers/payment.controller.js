const {
  createPaymentSession,
  listenForPaymentSuccess,
} = require('../services/payment.service')

exports.createPaymentSession = async (req, res) => {
  const { email, product } = req.body
  const { offerId } = res.locals.offerId
  try {
    const session = await createPaymentSession(email, product, offerId)
    return session
  } catch (error) {
    console.log(error)
  }
}

exports.listenForPaymentSuccess = async (req, res, next) => {
  try {
    const signature = req.headers['stripe-signature']
    const offerId = await listenForPaymentSuccess(req.rawBody, signature)
    req.body.offerId = offerId
    next()
  } catch (error) {
    console.log(error)
  }
}
