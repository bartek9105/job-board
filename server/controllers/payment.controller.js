const {
  createPaymentSession,
  listenForPaymentSuccess,
} = require('../services/payment.service')

exports.createPaymentSession = async (req, res, next) => {
  const { email, product } = req.body
  const { offerId } = res.locals
  const { creatorId } = req
  try {
    const session = await createPaymentSession(
      email,
      product,
      offerId,
      creatorId
    )
    res.status(200).send({ data: { sessionId: session } })
  } catch (error) {
    next(error)
  }
}

exports.listenForPaymentSuccess = async (req, res, next) => {
  try {
    const signature = req.headers['stripe-signature']
    const {
      offerId,
      receiptUrl,
      creatorId,
      created,
      amount,
    } = await listenForPaymentSuccess(req.rawBody, signature)
    req.body.offerId = offerId
    req.body.receiptUrl = receiptUrl
    req.body.creatorId = creatorId
    req.body.created = created
    req.body.amount = amount
    next()
  } catch (error) {
    next(error)
  }
}
