const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/error')
const dbConnection = require('./config/db')

dotenv.config({ path: './config/.env' })

dbConnection()

const app = express()

app.use(morgan('tiny'))
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  })
)
app.use(cookieParser())
app.use(fileupload())

const offers = require('./routes/offers.route')
const auth = require('./routes/auth.route')
const products = require('./routes/products.route')
const users = require('./routes/users.route')

app.use('/api/v1/offers', offers)
app.use('/api/v1/auth', auth)
app.use('/api/v1/products', products)
app.use('/api/v1/users', users)

const cronJob = require('./utils/cronJobValidate')
cronJob.start()

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server started on ${PORT} in ${process.env.NODE_ENV} mode`)
)

process.on('unhandledRejection', (err) => {
  console.log(err.message)
  process.exit(1)
})
