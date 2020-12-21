const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Employer = require('../models/Employer')

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await new Employer({
      name,
      email,
      hashPassword,
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
      return next(
        new ErrorResponse('Please provide an email and password', 401)
      )
    }

    const employer = await Employer.findOne({ email })

    if (!employer) {
      return next(new ErrorResponse('Invalid credentials'), 401)
    }

    const passwordValid = await bcrypt.compare(password, employer.password)

    if (!passwordValid) {
      return next(new ErrorResponse('Invalid credentials'), 401)
    }

    const token = jwt.sign(
      {
        id: employer._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
      })
      .send({ status: 'success', data: employer.name })
  } catch (error) {
    next(error)
  }
}

exports.logout = (req, res) => {
  res.status(200).cookie('token', '').send('Success')
}
