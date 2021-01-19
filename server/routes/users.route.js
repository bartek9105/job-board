const express = require('express')
const router = express.Router()

const { getUserOffers, updateUser } = require('../controllers/user.controller')
const { isAuth } = require('../middleware/isAuth')

router.get('/:id/offers', getUserOffers)
router.patch('/about', isAuth, updateUser)

module.exports = router
