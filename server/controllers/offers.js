const Offer = require('../models/Offer')
const { search } = require('../routes/offers')
const ErrorResponse = require('../utils/errorResponse')
const _ = require('lodash')

exports.getOffers = async (req, res, next) => {
    try {
        const reqQuery = { ...req.query }
        
        const removeFields = ['page', 'limit']
        removeFields.forEach(param => delete reqQuery[param])
        
        let query = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 5
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        
        const parsedQuery = JSON.parse(query)
        
        let locationSearch = {}
        
        if (parsedQuery.q) {
            locationSearch = {
                $text: {
                    $search: parsedQuery.q
                }
            }
        }
        
        const availableFilters = Object.keys(Offer.schema.paths)
        const schemaFilters = _.pickBy(parsedQuery, (value, key) => availableFilters.indexOf(key) > -1)
        
        const offers = await Offer.find({ ...schemaFilters, ...locationSearch }).skip(startIndex).limit(limit)
        
        const total = await Offer.find({ ...schemaFilters, ...locationSearch }).countDocuments()

        const pagination = {}

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        const pages = Math.ceil(total / limit)

        res.status(200).send({
            total,
            pages,
            pagination,
            data: offers
        })
    } catch (error) {
        next(error)
    }
}

exports.getOffer = async (req, res, next) => {
    try {
        const offer = await Offer.findById(req.params.id)
        res.status(200).send({
            data: offer
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
        const offer = new Offer(req.body)
        const savedOffer = await offer.save()
        res.status(200).send({
            data: savedOffer
        })        
    } catch (error) {
        next(error)
    }
}

exports.editOffer = async (req, res, next) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        })
        if (!offer) {
            return res.status(400).send({
                error: error
            })
        }
        res.status(200).send({
            data: offer
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
                error: error
            })
        }
        res.status(200).send({
            data: {}
        })        
    } catch (error) {
        next(error)
    }
}