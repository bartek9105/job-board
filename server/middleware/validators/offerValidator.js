const Joi = require('joi')

exports.offerValidator = (req, res, next) => {
  const offerSchema = Joi.object({
    title: Joi.string().min(10).max(50).required(),
    category: Joi.string().required(),
    type: Joi.string().required(),
    seniority: Joi.string().required(),
    salary: {
      salaryMin: Joi.number().required(),
      salaryMax: Joi.number().required().greater(Joi.ref('salaryMin')),
      currency: Joi.string().required(),
    },
    description: Joi.string().required().min(10).max(10000),
    location: {
      address: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
    },
    contract: Joi.string().required(),
    mainTechnology: {
      name: Joi.string().required(),
    },
    technologies: Joi.array().items({
      name: Joi.string(),
    }),
    benefits: {
      name: Joi.string().required(),
    },
    applyURL: Joi.string().required().uri(),
    productId: Joi.string().required(),
  })

  const { error } = offerSchema.validate(req.body, {
    abortEarly: false,
  })

  if (error) {
    const err = { name: 'ValidationError', message: error.details }
    next(err)
  }
  next()
}
