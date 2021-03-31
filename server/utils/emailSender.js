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

module.exports = emailSender
