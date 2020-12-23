const express = require('express')
const router = express.Router()

const { register, login, refreshToken, logout } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/refresh_token', refreshToken)
router.post('/logout', logout)

module.exports = router
