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
      const { title, technologies, seniority, category, location, type, salaryMin, salaryMax, contract } = queriesFilter
      const offers = await api.get(
        `offers?page=${queriesFilter.page}`,
        {
          params: {
            title,
            technologies: { in: technologies },
            seniority,
            category,
            location,
            type: type,
            salary: {
              lt: salaryMax,
              gt: salaryMin
            },
            contract
          },
          paramsSerializer: params => qs.stringify(params)
        }
      )
      return offers.data.data
    } catch (error) {
      console.log(error)
    }
  },
  addOffer: async function (offerData) {
    try {
      const addedOffer = await api.post('offers',
        { email: 'example@gmail.com', ...offerData })
      return addedOffer.data
    } catch (error) {
      console.log(error)
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
    const userId = StorageService.getUserData().id
    try {
      const offers = await api.get(`users/${userId}/offers`)
      return offers.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default OfferService