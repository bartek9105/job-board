const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcryptjs')
const Employer = require('../models/Employer')
const { signJwtToken } = require('../utils/tokenSign')
const jwt = require('jsonwebtoken')

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

    const token = signJwtToken(
      employer._id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES
    )

    const refreshToken = signJwtToken(
      employer._id,
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_SECRET_EXPIRES
    )

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
      })
      .cookie('refreshToken', refreshToken, {
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

exports.refreshToken = async (req, res, next) => {
  let token
  let refreshToken
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split('; ')
    token = cookies.find((cookie) => cookie.includes('token'))
    refreshToken = cookies.find((cookie) => cookie.includes('refreshToken'))
    token = token.split('=')[1]
    refreshToken = refreshToken.split('=')[1]
    if (!token && !refreshToken) {
      next(new ErrorResponse('Not authorized', 403))
    }
    try {
      const decodedRefreshToken = await jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      )
      if (decodedRefreshToken) {
        const token = signJwtToken(
          decodedRefreshToken.id,
          process.env.JWT_SECRET,
          process.env.JWT_EXPIRES
        )
        res
          .status(200)
          .cookie('token', token, { httpOnly: true })
          .send({ status: 'success' })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
