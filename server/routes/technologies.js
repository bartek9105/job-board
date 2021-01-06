const express = require('express')
const router = express.Router()

const { getTechnologies } = require('../controllers/technologies')

router.get('/', getTechnologies)

module.exports = router
