const Joi = require('joi')

exports.authValidator = (req, res, next) => {
  const offerSchema = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
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
