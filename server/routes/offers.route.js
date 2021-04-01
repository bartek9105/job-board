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

const {
  createPaymentSession,
  listenForPaymentSuccess,
} = require('../controllers/payment.controller')

const { getProduct } = require('../controllers/product.controller')

const { isAuth } = require('../middleware/isAuth')

router.get('/', getOffers)
router.get('/:id', getOffer)
router.put('/:id', isAuth, editOffer)
router.delete('/:id', isAuth, deleteOffer)

router.post('/', isAuth, getProduct, addOffer, createPaymentSession)
router.post('/webhook', listenForPaymentSuccess, updateOfferStatus)

module.exports = router
