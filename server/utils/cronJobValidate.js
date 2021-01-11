const CronJob = require('cron').CronJob
const { validateOfferPromotionStatus } = require('../services/offer.service')

const job = new CronJob('21 16 * * *', () => {
  validateOfferPromotionStatus()
})

module.exports = job
