const {
  getUserOffers,
  updateUser,
  getUsers,
  getUser,
} = require('../services/user.service')
const isResourceCreator = require('../utils/isResourceCreator')
const ErrorResponse = require('../utils/errorResponse')

exports.getUserOffers = async (req, res, next) => {
  const { id: userId } = req.params
  try {
    const user = await getUser(userId)
    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }
    const offers = await getUserOffers(userId)
    res.status(200).send({ data: offers })
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  const requesterId = req.creatorId
  const userInfo = req.body
  console.log(userInfo)
  const { id: userId } = req.params
  try {
    const user = await getUser(userId)
    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }
    if (!isResourceCreator(requesterId, user._id)) {
      return next(new ErrorResponse('Forbidden', 403))
    }
    await updateUser(userId, userInfo)
    res.status(200).send({ status: 'User updated' })
  } catch (error) {
    next(error)
  }
}

exports.getUsers = async (req, res, next) => {
  const queries = req.query
  try {
    const users = await getUsers(queries)
    res.status(200).send({ data: users })
  } catch (error) {
    next(error)
  }
}

exports.getUser = async (req, res, next) => {
  const { id: userId } = req.params
  try {
    const user = await getUser(userId)
    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }
    res.status(200).send({ data: user })
  } catch (error) {
    next(error)
  }
}
