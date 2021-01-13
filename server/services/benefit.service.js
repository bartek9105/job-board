const Benefit = require('../models/Benefit')

const BenefitService = {
  getBenefits: async function () {
    try {
      return await Benefit.find()
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = BenefitService
