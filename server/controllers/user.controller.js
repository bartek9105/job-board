const {
  getUserOffers,
  updateUser,
  getUsers,
  getUser,
} = require('../services/user.service')

exports.getUserOffers = async (req, res, next) => {
  const { id: userId } = req.params
  try {
    const offers = await getUserOffers(userId)
    res.status(200).send({ data: offers })
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  const userId = req.creatorId
  const userInfo = req.body
  try {
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
    res.status(200).send({ data: user })
  } catch (error) {
    next(error)
  }
}
