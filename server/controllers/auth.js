const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employer = require('../models/Employer')
const stripe = require('../config/stripe')

exports.register = async (req, res, next) => {
    try {
        const { name, email } = req.body

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        
        const user = await new Employer({
            name, email, password
        })
        await user.save()

        res.status(200).send('User registered')
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new ErrorResponse('Please provide an email and password', 401))
        }
        
        const employer = await Employer.findOne({ email })
        
        if (!employer) {
            return next(new ErrorResponse('Invalid credentials'), 401)
        }
        
        const passwordValid = await bcrypt.compare(password, employer.password)

        if (!passwordValid) {
            return next(new ErrorResponse('Invalid credentials'), 401)
        }

        const token = jwt.sign({
            id: employer._id
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })

        res.status(200).send({ token })
    } catch (error) {
        next(error)
    }
}

exports.subscribe = async (req, res, next) => {
    const { email } = req.body
    try {
        const customer = await stripe.customers.create({
            email: email
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer: customer.id,
            line_items: [
              {
                "price": process.env.STRIPE_PRICE,
                "quantity": 1
              }
            ],
            mode: 'payment',
            cancel_url: 'http://localhost:8080',
            success_url: 'http://localhost:8080'
          })
        res.json({ id: session.id });
    } catch (error) {
        console.log(error)
    }
}