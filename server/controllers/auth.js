const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcryptjs')
const Employer = require('../models/Employer')

exports.register = async (req, res, next) => {
    try {
        const { name, email } = req.body

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        
        const user = await new Employer({
            name, email, password
        })
        const savedUser = await user.save()
        res.status(200).send('User registered')
    } catch (error) {
        next(error)
    }
}