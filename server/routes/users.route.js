const express = require('express')
const router = express.Router()

const { getUserOffers, uploadFile } = require('../controllers/user.controller')

router.get('/:id/offers', getUserOffers)
router.post('/upload', uploadFile)

module.exports = router
