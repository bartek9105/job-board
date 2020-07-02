const mongoose = require('mongoose')

const dbConnection = async () => {
    await mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    console.log('Connected to database')        
}

module.exports = dbConnection