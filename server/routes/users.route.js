const express = require('express')
const router = express.Router()

const {
  getUserOffers,
  updateUser,
  uploadFile,
} = require('../controllers/user.controller')
const { isAuth } = require('../middleware/isAuth')

router.get('/:id/offers', getUserOffers)
router.patch('/about', isAuth, updateUser)
router.post('/upload', uploadFile)

module.exports = router
