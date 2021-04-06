const mongoose = require('mongoose')
const slugify = require('slugify')
const geocodedData = require('../utils/geocoder')

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [50, 'Title cannot be longer than 50 characters'],
      required: true,
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
      required: true,
    },
    type: {
      type: String,
      enum: ['Full Time', 'Part Time'],
      required: true,
    },
    seniority: {
      type: String,
      enum: ['Intern', 'Junior', 'Regular', 'Senior'],
      required: true,
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
      required: true,
    },
    location: {
      address: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      latitude: Number,
      longitude: Number,
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
    contract: {
      type: String,
      enum: ['Employment contract', 'B2B', 'Mandatory contract'],
      required: true,
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
        name: {
          type: String,
          required: true,
          trim: true,
        },
        icon: {
          type: String,
          trim: true,
          default: '',
        },
      },
    ],
    benefits: [
      {
        _id: false,
        name: {
          type: String,
          trim: true,
        },
      },
    ],
    applyURL: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
    },
    isPromoted: {
      type: Boolean,
      default: false,
    },
    slug: String,
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: 'Employer',
      required: true,
    },
    promotionExpiresAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

offerSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
  })
  next()
})

offerSchema.pre('save', async function (next) {
  try {
    const { latitude, longitude } = await geocodedData(this.location)
    this.location.latitude = latitude
    this.location.longitude = longitude
    next()
  } catch (error) {
    console.log(error)
  }
})

offerSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('Offer', offerSchema)
