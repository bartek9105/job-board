const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [50, 'Title cannot be longer than 50 characters'],
    },
    category: {
      name: {
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
      color: {
        type: String,
      },
    },
    type: {
      type: String,
      enum: ['Full Time', 'Part Time'],
    },
    seniority: {
      type: String,
      enum: ['Intern', 'Junior', 'Regular', 'Senior'],
    },
    salary: {
      salaryMin: {
        type: Number,
        trim: true,
        required: true,
      },
      salaryMax: {
        type: Number,
        trim: true,
        required: true,
      },
      currency: {
        type: String,
        trim: true,
        required: true,
        enum: ['PLN', 'EUR', 'USD', 'GBP', 'CHF', 'CAD', 'AUD'],
      },
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
    mainTechnology: {
      name: {
        type: String,
        trim: true,
        required: true,
      },
      icon: {
        type: String,
        trim: true,
      },
    },
    technologies: [
      {
        _id: false,
        name: String,
        icon: String,
      },
    ],
    benefits: [
      {
        _id: false,
        name: String,
      },
    ],
    applyURL: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
    },
    isPromoted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isPreview: {
      type: Boolean,
      required: true,
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
