import axiosInstance from './Api'
import qs from 'qs'

const OfferService = {
  fetchOffer: async function (offerId) {
    try {
      const offer = await axiosInstance.get(`offers/${offerId}`)
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
      const offers = await axiosInstance.get(
        `offers?page=${queriesFilter.page}`,
        {
          params: {
            technologies: { in: queriesFilter.technologies },
            seniority: queriesFilter.seniority,
            category: queriesFilter.category,
            q: queriesFilter.location,
            type: queriesFilter.type,
            salary: {
              lt: queriesFilter.salaryMax,
              gt: queriesFilter.salaryMin
            },
            contract: queriesFilter.contract
          },
          paramsSerializer: params => qs.stringify(params)
        }
      )
      return offers.data
    } catch (error) {
      console.log(error)
    }
  },
  addOffer: async function (offerData) {
    try {
      const addedOffer = await axiosInstance.post('offers',
        { email: 'example@gmail.com', ...offerData })
      return addedOffer.data
    } catch (error) {
      console.log(error)
    }
  }
}

export default OfferService