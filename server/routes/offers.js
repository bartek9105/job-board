const express = require('express')
const router = express.Router()

const offersController = require('../controllers/offers')
const paymentController = require('../controllers/payment')

router.get('/', offersController.getOffers)

router.get('/:id', offersController.getOffer)

router.post('/', offersController.addOffer, paymentController.createPaymentSession)

router.post('/webhook', paymentController.listenForPaymentSuccess, offersController.updateOfferStatus)

router.put('/:id', offersController.editOffer)

router.delete('/:id', offersController.deleteOffer)

module.exports = router