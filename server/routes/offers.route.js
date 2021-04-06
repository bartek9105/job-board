const express = require('express')
const router = express.Router()
const { offerValidator } = require('../middleware/validators/offerValidator')

const {
  getOffer,
  getOffers,
  editOffer,
  deleteOffer,
  updateOfferStatus,
  addFreeOffer,
  addPaidOffer,
} = require('../controllers/offer.controller.js')

const {
  createPaymentSession,
  listenForPaymentSuccess,
} = require('../controllers/payment.controller')

const { getProduct } = require('../controllers/product.controller')

const { isAuth } = require('../middleware/isAuth')

router.get('/', getOffers)
router.get('/:id', getOffer)
router.put('/:id', offerValidator, isAuth, editOffer)
router.delete('/:id', isAuth, deleteOffer)

router.post('/free', isAuth, getProduct, addFreeOffer)
router.post('/paid', isAuth, getProduct, addPaidOffer, createPaymentSession)
router.post('/webhook', listenForPaymentSuccess, updateOfferStatus)

module.exports = router
