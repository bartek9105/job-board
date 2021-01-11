const { getTechnologies } = require('../services/technology.service')

exports.getTechnologies = async (req, res, next) => {
  try {
    const technologies = await getTechnologies()
    res.status(200).send(technologies)
  } catch (error) {
    next(error)
  }
}
