const express = require('express')
const router = express.Router()

const offersController = require('../controllers/offers')
const paymentController = require('../controllers/payment')
const productController = require('../controllers/products')

const isAuth = require('../middleware/isAuth')

router.get('/', offersController.getOffers)

router.get('/:id', offersController.getOffer)

router.post(
  '/',
  isAuth.isAuth,
  productController.getProduct,
  offersController.addOffer,
  paymentController.createPaymentSession
)

router.post(
  '/webhook',
  paymentController.listenForPaymentSuccess,
  offersController.updateOfferStatus
)

router.put('/:id', isAuth.isAuth, offersController.editOffer)

router.delete('/:id', isAuth.isAuth, offersController.deleteOffer)

module.exports = router
