const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config/.env' })

const Offer = require('./models/Offer')
const Employer = require('./models/Employer')

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  bufferCommands: false,
  bufferMaxEntries: 0,
})

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
)

const offers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/offers.json`, 'utf-8')
)

const importMockData = async () => {
  try {
    await Employer.create(users)
    await Offer.create(offers)
    console.log('Data imported')
  } catch (error) {
    console.log(error)
  }
}

importMockData()
