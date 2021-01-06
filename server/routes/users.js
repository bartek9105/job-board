const express = require('express')
const router = express.Router()

const { getUserOffers } = require('../controllers/users')

router.get('/:id/offers', getUserOffers)

module.exports = router
