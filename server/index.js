const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const errorHandler = require('./middleware/error')
const dbConnection = require('./config/db')

dotenv.config({ path: './config/.env' })
 
dbConnection()

const app = express()

app.use(cors())
app.use(express.json())

const offers = require('./routes/offers')
const auth = require('./routes/auth')
const products = require('./routes/products')
const payments = require('./routes/payments')

app.use('/api/v1/offers', offers)
app.use('/api/v1/auth', auth)
app.use('/api/v1/products', products)
app.use('/api/v1/payments', payments)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT} in ${process.env.NODE_ENV} mode`))