const nodemailer = require('nodemailer')

const emailSender = async ({ sendTo, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  })
  try {
    await transporter.sendMail({
      from: process.env.MAILTRAP_SENDER,
      to: sendTo,
      subject,
      html,
    })
  } catch (error) {
    console.log(error)
  }
}

const passwordResetEmail = async (email, resetUrl) => {
  await emailSender({
    sendTo: email,
    subject: 'Password reset',
    html: `<p>You (or someone else) requested a password reset for your CodeJob account. <br> <a href="${resetUrl}">Click here to reset your password</a>`,
  })
}

const resetPasswordClientUrl = (resetPasswordToken, userId) =>
  `${process.env.CLIENT_URL}/passwordreset?token=${resetPasswordToken}&id=${userId}`

module.exports = { emailSender, passwordResetEmail, resetPasswordClientUrl }
