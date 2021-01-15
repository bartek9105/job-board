const Offer = require('../models/Offer')
const ErrorResponse = require('../utils/errorResponse')
const Fuse = require('fuse.js')

const {
  addOffer,
  editOffer,
  deleteOffer,
  getOfferById,
  updateOfferPaymentStatus,
} = require('../services/offer.service')
const isResourceCreator = require('../utils/isResourceCreator')

exports.getOffers = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query }
    const removeFields = ['page', 'limit', 'title']
    removeFields.forEach((param) => delete reqQuery[param])

    const query = JSON.stringify(reqQuery).replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    )

    const parsedQuery = JSON.parse(query)

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 30
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let offers = await Offer.find({
      ...parsedQuery,
      $or: [{ status: 'free' }, { status: 'paid' }],
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ isPromoted: -1, createdAt: 'desc' })
      .populate('creator')

    const total = await Offer.find().countDocuments()

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

    if (req.query.title) {
      const fuse = new Fuse(offers, {
        keys: ['title'],
      })

      const results = fuse.search(req.query.title)
      offers = results.map((offer) => offer.item)
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

exports.getOffer = async (req, res, next) => {
  const offerId = req.params.id
  try {
    const offer = await getOfferById(offerId)
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
  const offerDTO = { creator: req.creatorId, ...req.body }
  try {
    const offer = await addOffer(offerDTO)
    const offerId = offer._id.toString()
    res.locals.offerId = offerId
    res.status(200).send({
      status: 'success',
      data: offer,
    })
    next()
  } catch (error) {
    next(error)
  }
}

exports.editOffer = async (req, res, next) => {
  const offerId = req.params.id
  const offerDTO = req.body
  try {
    const offer = await getOfferById(offerId)
    if (!offer) {
      return res.status(400).send({
        error: 'Offer not found',
      })
    }
    if (!isResourceCreator(req.creatorId, offer.creator)) {
      res.status(403).send('Not authorized')
    }
    const updatedOffer = await editOffer(offerId, offerDTO)
    res.status(200).send({
      data: updatedOffer,
    })
  } catch (error) {
    next(error)
  }
}

exports.updateOfferStatus = async (req, res, next) => {
  const { offerId } = req.body
  try {
    const offer = await updateOfferPaymentStatus(offerId)
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
  const offerId = req.params.id
  try {
    const offer = await deleteOffer(offerId)
    if (!offer) {
      return res.status(400).send({
        error: 'Offer not found',
      })
    }
    if (!isResourceCreator(req.creatorId, offer.creator)) {
      res.status(403).send('Not authorized')
    }
    res.status(200).send({
      data: {
        status: 'Offer deleted',
      },
    })
  } catch (error) {
    next(error)
  }
}
