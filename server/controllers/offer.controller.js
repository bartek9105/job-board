const Offer = require('../models/Offer')
const ErrorResponse = require('../utils/errorResponse')
const Fuse = require('fuse.js')
const {
  addOffer,
  addFreeOffer,
  addPaidOffer,
  editOffer,
  deleteOffer,
  getOfferById,
  updateOfferPaymentStatus,
} = require('../services/offer.service')
const { addInvoice } = require('../services/user.service')
const isResourceCreator = require('../utils/isResourceCreator')

exports.getOffers = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query }
    const removeFields = ['page', 'limit', 'title']
    removeFields.forEach((param) => delete reqQuery[param])

    const query = JSON.stringify(reqQuery).replace(
      /\b(gt|gte|lt|lte|in|ne)\b/g,
      (match) => `$${match}`
    )

    const parsedQuery = JSON.parse(query)

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    let offers = await Offer.find({
      ...parsedQuery,
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ isPromoted: -1, createdAt: 'desc' })
      .populate('creator', '-resetPasswordToken -password -invoices')

    const total = await Offer.find({
      ...parsedQuery,
      $or: [{ status: 'free' }, { status: 'paid' }],
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
  const { id: offerId } = req.params
  try {
    const offer = await getOfferById(offerId)
    if (!offer) {
      return next(new ErrorResponse('Offer not found', 404))
    }
    res.status(200).send({
      data: offer,
    })
  } catch (error) {
    next(error)
  }
}

exports.addFreeOffer = async (req, res, next) => {
  const offerDTO = { creator: req.creatorId, ...req.body }
  try {
    await addFreeOffer(offerDTO)
    res.status(201).send({ status: 'Offer created' })
  } catch (error) {
    next(error)
  }
}

exports.addPaidOffer = async (req, res, next) => {
  const offerDTO = { creator: req.creatorId, ...req.body }
  try {
    const offer = await addPaidOffer(offerDTO)
    const offerId = offer._id.toString()
    res.locals.offerId = offerId
    next()
  } catch (error) {
    next(error)
  }
}

exports.editOffer = async (req, res, next) => {
  const { id: offerId } = req.params
  const offerDTO = req.body
  const { creatorId } = req
  try {
    const offer = await getOfferById(offerId)
    if (!offer) {
      return next(new ErrorResponse('Offer not found', 404))
    }
    if (!isResourceCreator(creatorId, offer.creator._id)) {
      return next(new ErrorResponse('Forbidden', 403))
    }
    await editOffer(offerId, offerDTO)
    res.status(200).send({
      status: 'Offer edited',
    })
  } catch (error) {
    next(error)
  }
}

exports.updateOfferStatus = async (req, res, next) => {
  const { offerId, receiptUrl, creatorId, amount, created } = req.body
  try {
    const offer = await updateOfferPaymentStatus(offerId)
    if (!offer) {
      return next(new ErrorResponse('Offer not found', 404))
    }
    await addInvoice(creatorId, receiptUrl, amount, created)
    res.status(200).send({
      data: offer,
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteOffer = async (req, res, next) => {
  const { id: offerId } = req.params
  try {
    const offer = await getOfferById(offerId)
    if (!offer) {
      return next(new ErrorResponse('Offer not found', 404))
    }
    if (!isResourceCreator(req.creatorId, offer.creator._id)) {
      return next(new ErrorResponse('Forbidden', 403))
    }
    await deleteOffer(offerId)
    res.status(200).send({
      data: {
        status: 'Offer deleted',
      },
    })
  } catch (error) {
    next(error)
  }
}
