const setOfferExpiryDate = (daysNumber) => {
    return new Date(new Date().setDate(new Date().getDate() + daysNumber))
}

module.exports = setOfferExpiryDate