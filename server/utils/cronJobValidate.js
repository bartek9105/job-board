const CronJob = require('cron').CronJob
const offersController = require('../controllers/offers')

const job = new CronJob('21 16 * * *', () => {
  offersController.validatePromotionStatus()
})

module.exports = job
