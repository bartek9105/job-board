const express = require('express')
const router = express.Router()

const { getBenefits } = require('../controllers/benefit.controller')

router.get('/', getBenefits)

module.exports = router
