const express = require('express')
const router = express.Router()

const {
  register,
  login,
  me,
  refreshToken,
  logout,
  resetPassword,
  setNewPassword,
} = require('../controllers/auth.controller')
const { authValidator } = require('../middleware/validators/authValidator')

const { isAuth } = require('../middleware/isAuth')

router.post('/register', authValidator, register)
router.post('/login', login)
router.get('/me', isAuth, me)
router.post('/refresh_token', refreshToken)
router.post('/logout', logout)
router.post('/resetpassword', resetPassword)
router.post('/setnewpassword', setNewPassword)

module.exports = router
