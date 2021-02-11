const Technology = require('../models/Technology')

const TechnologyService = {
  getTechnologies: async function () {
    try {
      return Technology.find({}, '-_id').sort('name')
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = TechnologyService
