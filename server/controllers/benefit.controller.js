const { getBenefits } = require('../services/benefit.service')

exports.getBenefits = async (req, res, next) => {
  try {
    const benefits = await getBenefits()
    res.status(200).send(benefits)
  } catch (error) {
    next(error)
  }
}
