<template>
  <div>
    <div class="bg-white rounded-sm shadow-md px-8 py-4 hover:shadow-lg mb-4 border-solid border-l-4 border-green-500" v-for="offer in jobOffers" :key="offer._id">
        <div class="flex justify-between items-center mb-4">
            <div>
                <div class="flex items-center">
                    <h4 class="text-gray-900 mr-3 text-xl">{{ offer.title }}</h4>
                    <span class="text-green-600 mr-2">{{ offer.salary }} PLN</span>
                    <span class="text-green-600">{{ offer.type }}</span>
                </div>
                <span class="text-gray-600 mr-2">Netflix</span>
            </div>
            <span class="text-xs bg-green-500 text-white rounded p-3">{{ offer.category }}</span>
        </div>
        <div class="flex justify-between">
            <div>
                <span class="text-white bg-gray-500 rounded-lg px-4 py-1 mr-2" v-for="technology in offer.technologies" :key="technology">{{ technology }}</span>
            </div>
            <div>
                <i class="fas fa-map-marker-alt mr-2 text-red-500"></i>
                <span>{{ offer.location }}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'JobOffers',
  data () {
    return {
      jobOffers: null
    }
  },
  methods: {
    async getJobOffers () {
      try {
        const offers = await axios.get('http://localhost:5000/api/v1/offers')
        this.jobOffers = offers.data.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getJobOffers()
  }
}
</script>

<style>

</style>
