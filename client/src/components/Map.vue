<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

export default {
  name: 'Map',
  props: {
    location: String
  },
  data () {
    return {
      coordinates: [54, 18],
      map: {}
    }
  },
  methods: {
    async fetchCoordinates () {
      try {
        const data = await axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.VUE_APP_MAPQUEST_KEY}&location=${this.location}`)
        const result = data.data.results[0].locations[0].latLng
        this.coordinates = [result.lat, result.lng]
      } catch (error) {
        console.log(error)
      }
    },
    async mapSetup () {
      this.map = L.map('map').setView(this.coordinates, 12)
      await L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map)
      const myIcon = L.divIcon({ html: '<i class="fas fa-map-marker-alt marker-icon"></i>', iconSize: [30, 40] })
      const marker = L.marker(this.coordinates, { icon: myIcon }).addTo(this.map)
      marker.bindPopup('I\'m a popup!').openPopup()
    }
  },
  mounted () {
    this.mapSetup()
  },
  watch: {
    location: async function (newLocation, oldLocation) {
      await this.fetchCoordinates()
      this.map.remove()
      this.mapSetup()
    }
  }
}
</script>

<style lang="scss">
  #map {
    height: 317px;
    .leaflet-div-icon {
      border: none;
      background: transparent;
      .marker-icon {
        font-size: 40px;
        color: $theme-dark-blue;
      }
    }
  }
</style>
