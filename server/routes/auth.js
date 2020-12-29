const express = require('express')
const router = express.Router()

const {
  register,
  login,
  me,
  refreshToken,
  logout,
} = require('../controllers/auth')

const { isAuth } = require('../middleware/isAuth')

router.post('/register', register)
router.post('/login', login)
router.get('/me', isAuth, me)
router.post('/refresh_token', refreshToken)
router.post('/logout', logout)

module.exports = router
