const { getUserOffers, uploadUserAvatar } = require('../services/user.service')

exports.getUserOffers = async (req, res, next) => {
  const userId = req.params.id
  try {
    const offers = await getUserOffers(userId)
    res.send(offers)
  } catch (error) {
    next(error)
  }
}

exports.uploadFile = async (req, res, next) => {
  try {
    const url = await uploadUserAvatar(req.files.foo)
    res.status(200).send(url)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
