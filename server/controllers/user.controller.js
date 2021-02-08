const {
  getUserOffers,
  updateUser,
  getUsers,
} = require('../services/user.service')

exports.getUserOffers = async (req, res, next) => {
  const userId = req.params.id
  try {
    const offers = await getUserOffers(userId)
    res.send(offers)
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  const userId = req.creatorId
  const userInfo = req.body
  try {
    await updateUser(userId, userInfo)
  } catch (error) {
    console.log(error)
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await getUsers()
    res.send(users)
  } catch (error) {
    console.log(error)
  }
}
