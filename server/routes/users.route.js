const express = require('express')
const router = express.Router()

const {
  getUserOffers,
  updateUser,
  getUsers,
  getUser,
} = require('../controllers/user.controller')
const { isAuth } = require('../middleware/isAuth')

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/offers', getUserOffers)

router.patch('/', isAuth, updateUser)

module.exports = router
