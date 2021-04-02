const ErrorResponse = require('../utils/errorResponse')
const { signJwtToken } = require('../utils/tokenSign')
const jwt = require('jsonwebtoken')
const {
  register,
  userExists,
  getMe,
  updatePasswordToken,
  updatePassword,
} = require('../services/auth.service')
const bcrypt = require('bcryptjs')
const {
  passwordResetEmail,
  resetPasswordClientUrl,
} = require('../utils/emailSender')
const hash = require('../utils/hash')
const tokenGenerator = require('../utils/tokenGenerator')
const { getUser } = require('../services/user.service')

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const user = await userExists(email)
    if (user) {
      return next(
        new ErrorResponse('User with this e-mail already exists', 409)
      )
    }
    await register({ name, email, password })
    res.status(201).send({ status: 'User registered' })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return next(
        new ErrorResponse('Please provide an email and password', 400)
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
      })
  } catch (error) {
    next(error)
  }
}

exports.logout = (req, res) => {
  res
    .status(200)
    .cookie('token', '')
    .cookie('refreshToken', '')
    .send({ status: 'success' })
}

exports.refreshToken = async (req, res, next) => {
  const { token, refreshToken } = req.cookies
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
    res.status(200).send({ data: me })
  } catch (error) {
    next(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await userExists(email)

    if (!user) {
      return next(new ErrorResponse("User with this e-mail doesn't exist", 404))
    }
    const userId = user._id

    const resetPasswordToken = tokenGenerator()
    const hashedResetPasswordToken = await hash(resetPasswordToken)

    await updatePasswordToken(userId, hashedResetPasswordToken)

    const resetUrl = resetPasswordClientUrl(resetPasswordToken, userId)
    await passwordResetEmail(email, resetUrl)

    res.status(200).send({ status: 'Password reset link sent' })
  } catch (error) {
    next(error)
  }
}

exports.setNewPassword = async (req, res, next) => {
  const { token, id, newPassword, confirmPassword } = req.body
  try {
    const user = await getUser(id)
    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }
    const userId = user._id
    if (newPassword !== confirmPassword) {
      return next(new ErrorResponse('Passwords must match', 400))
    }

    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken)
    if (!isTokenValid) {
      return next(new ErrorResponse('Invalid token', 400))
    }

    const hashedPassword = await hash(newPassword)

    await updatePassword(userId, hashedPassword)

    res.status(200).send({ status: 'New password set' })
  } catch (error) {
    next(error)
  }
}
