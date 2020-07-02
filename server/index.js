const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({ path: './config/config.env' })
 
const app = express()

app.use(cors())
app.use(express.json())

const offers = require('./routes/offers')

app.use('/api/v1/offers', offers)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT} in ${process.env.NODE_ENV} mode`))