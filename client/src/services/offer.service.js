import api from './api.service'
import qs from 'qs'
import StorageService from './storage.service'
import offerDetails from '../constants/offerDetails'

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
      const { _id, title, technologies, seniority, category, location, type, salaryMin, salaryMax, contract } = queriesFilter
      const offers = await api.get(
        `offers?page=${queriesFilter.page}`,
        {
          params: {
            _id: {
              ne: _id
            },
            title,
            technologies: { in: technologies },
            seniority,
            category,
            location,
            type,
            salaryMin: {
              gte: salaryMin
            },
            salaryMax: {
              lte: salaryMax
            },
            contract
          },
          paramsSerializer: params => qs.stringify(params)
        }
      )
      offers.data.data.map(offer => {
        offerDetails.CATEGORIES.map(category => {
          if (category.name === offer.category) {
            offer.category = { name: offer.category, color: category.color }
          }
        })
      })
      return offers.data
    } catch (error) {
      console.log(error)
    }
  },
  addOffer: async function (offerData) {
    offerData.category = offerData.category.name
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