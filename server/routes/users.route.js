const express = require('express')
const router = express.Router()

const { getUserOffers } = require('../controllers/user.controller')

router.get('/:id/offers', getUserOffers)

module.exports = router
