const Technology = require('../models/Technology')

exports.getTechnologies = async (req, res, next) => {
  try {
    const technologies = await Technology.find().sort('name')
    res.status(200).send(technologies)
  } catch (error) {
    next(error)
  }
}
