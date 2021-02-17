const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [50, 'Title cannot be longer than 50 characters'],
    },
    category: {
      type: String,
      enum: [
        'Frontend',
        'Backend',
        'Fullstack',
        'UI/UX',
        'DevOps',
        'Data Science',
        'Testing',
        'PM',
        'Support',
        'Big Data',
        'Security',
        'Mobile',
        'Embedded',
        'Gaming',
        'AI',
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
      maxlength: [10000, 'Description cannot be longer than 10000 characters'],
      trim: true,
    },
    location: {
      type: Object,
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
    slug: String,
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employer',
      required: true,
    },
    promotionExpireAt: {
      type: Date,
    },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

offerSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('Offer', offerSchema)
