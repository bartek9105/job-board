const Offer = require('../models/Offer')

exports.getOffers = async (req, res, next) => {
    try {
        const offers = await Offer.find()
        res.status(200).send({
            count: offers.length,
            data: offers
        })
    } catch (error) {
        res.status(400).send({
            error: error
        })
    }
}

exports.getOffer = async (req, res, next) => {
    try {
        const offer = await Offer.findById(req.params.id)
        res.status(200).send({
            data: offer
        })
        if (!offer) {
            return res.status(400).send({
                error: error
            })
        }
    } catch (error) {
        res.status(400).send({
            error: error
        })
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
        res.status(400).send({
            error: error
        })
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
        res.status(400).send({
            error: error
        })
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
        res.status(400).send({
            error: error
        })
    }
}