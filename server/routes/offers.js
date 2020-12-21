const express = require('express')
const router = express.Router()

const offersController = require('../controllers/offers')
const paymentController = require('../controllers/payment')
const productController = require('../controllers/products')

router.get('/', offersController.getOffers)

router.get('/:id', offersController.getOffer)

router.post(
  '/',
  productController.getProduct,
  offersController.addOffer,
  paymentController.createPaymentSession
)

router.post(
  '/webhook',
  paymentController.listenForPaymentSuccess,
  offersController.updateOfferStatus
)

router.put('/:id', offersController.editOffer)

router.delete('/:id', offersController.deleteOffer)

module.exports = router
