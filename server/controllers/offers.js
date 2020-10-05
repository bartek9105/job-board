const Offer = require('../models/Offer')
const ErrorResponse = require('../utils/errorResponse')

exports.getOffers = async (req, res, next) => {
    try {
        const reqQuery = { ...req.query }
        
        const removeFields = ['page', 'limit']
        removeFields.forEach(param => delete reqQuery[param])
        
        let query = JSON.stringify(reqQuery).replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1) * limit

        const offers = await Offer.find(JSON.parse(query)).skip(skip).limit(limit).sort({ 'createdAt': -1 })
        res.status(200).send({
            count: offers.length,
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