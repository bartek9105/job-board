const express = require('express')
const router = express.Router()

const {
  getOffer,
  getOffers,
  addOffer,
  editOffer,
  deleteOffer,
  updateOfferStatus,
} = require('../controllers/offer.controller.js')
const paymentController = require('../controllers/payment.controller')
const productController = require('../controllers/products')

const isAuth = require('../middleware/isAuth')

router.get('/', getOffers)

router.get('/:id', getOffer)

router.post(
  '/',
  isAuth.isAuth,
  productController.getProduct,
  addOffer,
  paymentController.createPaymentSession
)

router.post(
  '/webhook',
  paymentController.listenForPaymentSuccess,
  updateOfferStatus
)

router.put('/:id', isAuth.isAuth, editOffer)

router.delete('/:id', isAuth.isAuth, deleteOffer)

module.exports = router
