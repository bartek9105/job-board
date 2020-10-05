const express = require('express')
const router = express.Router()

const offersController = require('../controllers/offers')

router.get('/', offersController.getOffers)

router.get('/:id', offersController.getOffer)

router.post('/', offersController.addOffer)

router.put('/:id', offersController.editOffer)

router.delete('/:id', offersController.deleteOffer)

module.exports = router