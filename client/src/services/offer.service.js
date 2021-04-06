import api from './api.service'
import qs from 'qs'
import StorageService from './storage.service'

const OfferService = {
  fetchOffer: async function (offerId) {
    try {
      const offer = await api.get(`offers/${offerId}`)
      return offer.data.data
    } catch (error) {
      console.log(error)
    }
  },
  fetchOffers: async function (offersQueries) {
    try {
      const queriesFilter = Object.keys(offersQueries)
        .filter(e => {
          return offersQueries[e] !== null && offersQueries[e] !== ''
        })
        .reduce((o, e) => {
          o[e] = offersQueries[e]
          return o
        }, {})
      const {
        _id,
        title,
        technologies,
        seniority,
        location,
        category,
        salaryMin,
        salaryMax,
        type,
        contract
      } = queriesFilter
      const offers = await api.get(`offers?page=${queriesFilter.page}`, {
        params: {
          _id: {
            ne: _id
          },
          title,
          technologies: {
            name: technologies
          },
          seniority,
          category,
          location: {
            city: location
          },
          type,
          salary: {
            "salaryMin[gte]": salaryMin,
            "salaryMax[lte]": salaryMax
          },
          contract
        },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: "brackets", encode: false, allowDots: true })
      })
      return offers.data
    } catch (error) {
      console.log(error)
    }
  },
  addPaidOffer: async function (offerData) {
    try {
      const addedOffer = await api.post('offers/paid', offerData)
      return addedOffer
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },
  addFreeOffer: async function (offerData) {
    try {
      const addedOffer = await api.post('offers/free', offerData)
      return addedOffer.data.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  },
  editOffer: async function (offerData) {
    try {
      await api.put(`offers/${offerData._id}`, offerData)
    } catch (error) {
      console.log(error)
    }
  },
  deleteOffer: async function (offerId) {
    try {
      await api.delete(`offers/${offerId}`)
    } catch (error) {
      console.log(error)
    }
  },
  fetchOffersByUser: async function () {
    const userId = StorageService.getUserData()._id
    try {
      const offers = await api.get(`users/${userId}/offers`)
      return offers.data.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default OfferService
