const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: [30, 'Title cannot be longer than 30 characters'],
  },
  category: {
    type: String,
    enum: [
      'Frontend',
      'Backend',
      'Fullstack',
      'UX/UI',
      'Devops',
      'Data Science',
      'Testing',
      'PM',
    ],
  },
  type: {
    type: String,
    enum: ['Full Time', 'Part Time'],
  },
  seniority: {
    type: String,
    enum: ['Intern', 'Junior', 'Regular', 'Senior'],
  },
  salaryMin: {
    type: Number,
    trim: true,
  },
  salaryMax: {
    type: Number,
    trim: true,
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot be longer than 1000 characters'],
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  isRemote: {
    type: Boolean,
    default: false,
  },
  contract: {
    type: String,
    enum: ['Employment contract', 'B2B', 'Mandatory contract'],
  },
  technologies: [
    {
      type: String,
    },
  ],
  benefits: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    required: true,
  },
  isPromoted: {
    type: Boolean,
    required: true,
    default: false,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'Employer',
    required: true,
  },
  promotionExpireAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
  },
})

offerSchema.index({ location: 'text' })
offerSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('Offer', offerSchema)
