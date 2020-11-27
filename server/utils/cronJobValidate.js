const CronJob = require('cron').CronJob
const offersController = require('../controllers/offers')

const job = new CronJob('41 10 * * *', () => {
    offersController.validatePromotionStatus()
})

module.exports = job