exports.getOffers = (req, res, next) => {
    res.status(200).send('All offers')
}

exports.getOffer = (req, res, next) => {
    res.status(200).send('Single offer')
}

exports.addOffer = (req, res, next) => {
    res.status(200).send('Add offer')
}

exports.editOffer = (req, res, next) => {
    res.status(200).send('Edit offer')
}

exports.deleteOffer = (req, res, next) => {
    res.status(200).send('Delete offer')
}