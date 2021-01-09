const Offer = require('../models/Offer')
const ErrorResponse = require('../utils/errorResponse')
const _ = require('lodash')
const setOfferExpiryDate = require('../utils/setOfferExpiryDate')

exports.getOffers = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query }

    const removeFields = ['page', 'limit']
    removeFields.forEach((param) => delete reqQuery[param])

    const query = JSON.stringify(reqQuery).replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    )

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 30
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const parsedQuery = JSON.parse(query)

    let locationSearch = {}

    if (parsedQuery.q) {
      locationSearch = {
        $text: {
          $search: parsedQuery.q,
        },
      }
    }

    const availableFilters = Object.keys(Offer.schema.paths)
    const schemaFilters = _.pickBy(
      parsedQuery,
      (value, key) => availableFilters.indexOf(key) > -1
    )

    const offers = await Offer.find({
      ...schemaFilters,
      ...locationSearch,
      $or: [{ status: 'free' }, { status: 'paid' }],
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ isPromoted: -1, createdAt: 'desc' })
      .populate('creator')

    const total = await Offer.find({
      ...schemaFilters,
      ...locationSearch,
    }).countDocuments()

    const pagination = {}

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      }
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      }
    }

    const pages = Math.ceil(total / limit)

    res.status(200).send({
      total,
      pages,
      pagination,
      data: offers,
    })
  } catch (error) {
    next(error)
  }
}

exports.validatePromotionStatus = async () => {
  try {
    await Offer.find({
      promotionExpireAt: { $lt: new Date().toISOString() },
    }).updateMany({ isPromoted: false })
  } catch (error) {
    console.log(error)
  }
}

exports.getOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id)
    res.status(200).send({
      data: offer,
    })
    if (!offer) {
      next(new ErrorResponse('Offer not found', 404))
    }
  } catch (error) {
    next(error)
  }
}

exports.addOffer = async (req, res, next) => {
  try {
    if (req.body.product[0].price === 0) {
      const offer = new Offer({
        ...req.body,
        creator: req.creatorId,
        status: 'free',
        expireAt: setOfferExpiryDate(7),
      })
      await offer.save()
    } else if (req.body.product[0].duration === '15d') {
      const offer = new Offer({
        ...req.body,
        creator: req.creatorId,
        status: 'unpaid',
        expireAt: setOfferExpiryDate(15),
        isPromoted: true,
        promotionExpireAt: setOfferExpiryDate(7),
      })
      const savedOffer = await offer.save()
      res.locals.savedOffer = savedOffer
      next()
    } else if (req.body.product[0].duration === '30d') {
      const offer = new Offer({
        ...req.body,
        creator: req.cretorId,
        status: 'unpaid',
        expireAt: setOfferExpiryDate(30),
        isPromoted: true,
        promotionExpireAt: setOfferExpiryDate(15),
      })
      const savedOffer = await offer.save()
      res.locals.savedOffer = savedOffer
      next()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.editOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id)
    if (!offer) {
      return res.status(400).send({
        error: 'Offer not found',
      })
    }

    if (req.creatorId !== offer.creator._id) {
      res.status(403).send('Not authorized')
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
      }
    )

    res.status(200).send({
      data: updatedOffer,
    })
  } catch (error) {
    next(error)
  }
}

exports.updateOfferStatus = async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      { _id: req.body.offerId },
      { status: 'paid' }
    )
    if (!offer) {
      return res.status(400).send({
        error: 'Offer not found',
      })
    }
    res.status(200).send({
      data: offer,
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findByIdAndRemove(req.params.id)
    if (!offer) {
      return res.status(400).send({
        error: 'Offer not found',
      })
    }
    if (req.creatorId !== offer.creator._id) {
      res.status(403).send('Not authorized')
    }
    res.status(200).send({
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
