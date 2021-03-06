const ErrorResponse = require('../utils/errorResponse')
const { signJwtToken } = require('../utils/tokenSign')
const jwt = require('jsonwebtoken')
const { register, userExists, getMe } = require('../services/auth.service')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
  try {
    await register(req.body)
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

    const user = await userExists(email)

    if (!user) {
      return next(new ErrorResponse('Invalid credentials'), 401)
    }

    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return next(new ErrorResponse('Invalid credentials'), 401)
    }
    const token = signJwtToken(
      user._id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES
    )

    const refreshToken = signJwtToken(
      user._id,
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
      .send({
        status: 'success',
        data: { id: user._id, name: user.name },
      })
  } catch (error) {
    next(error)
  }
}

exports.logout = (req, res) => {
  res.status(200).cookie('token', '').cookie('refreshToken', '').send('Success')
}

exports.refreshToken = async (req, res, next) => {
  const token = req.cookies.token
  const refreshToken = req.cookies.refreshToken
  if (!token && !refreshToken) {
    next(new ErrorResponse('Not authorized', 401))
  }
  try {
    const decodedRefreshToken = await jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    )
    const token = signJwtToken(
      decodedRefreshToken.id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES
    )
    res
      .status(200)
      .cookie('token', token, { httpOnly: true })
      .send({ status: 'success' })
  } catch (error) {
    next(error)
  }
}

exports.me = async (req, res, next) => {
  const userId = req.creatorId
  try {
    const me = await getMe(userId)
    res.status(200).send(me)
  } catch (error) {
    next(error)
  }
}
