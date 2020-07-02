const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({ path: './config/config.env' })
 
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Server started on ${PORT} in ${process.env.NODE_ENV} mode`))