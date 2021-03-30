const mongoose = require('mongoose')

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please add an e-mail'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
  },
  size: {
    type: String,
    default: 'Company size not specified',
    trim: true,
  },
  industry: {
    type: String,
    default: 'Company industry not specified',
    trim: true,
  },
  about: {
    type: String,
    maxlength: [1000, 'About section cannot be longer than 1000 characters'],
    trim: true,
  },
  avatarUrl: {
    type: String,
    trim: true,
  },
  location: {
    type: Object,
  },
  slug: {
    type: String,
  },
  invoices: [
    {
      _id: false,
      receiptUrl: String,
      created: Date,
      amount: Number,
    },
  ],
  refreshToken: String,
  resetPasswordToken: {
    type: String,
    default: '',
  },
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Employer', employerSchema)
