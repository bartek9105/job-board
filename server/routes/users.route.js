const express = require('express')
const router = express.Router()

const {
  getUserOffers,
  updateUser,
  getUsers,
  getUser,
} = require('../controllers/user.controller')
const { isAuth } = require('../middleware/isAuth')

router.get('/:id/offers', getUserOffers)
router.patch('/about', isAuth, updateUser)
router.get('/', getUsers)
router.get('/:id', getUser)

module.exports = router
