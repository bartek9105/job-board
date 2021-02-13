<template>
  <div class="map-container">
    <div id="map" />
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  props: {
    location: Object,
    title: String,
    company: String
  },
  data() {
    return {
      coordinates: [this.location.latitude, this.location.longitude],
      map: {}
    }
  },
  watch: {
    location: function(newLocation, oldLocation) {
      this.map.remove()
      this.mapSetup([newLocation.latitude, newLocation.longitude])
    },
    deep: true
  },
  mounted() {
    this.mapSetup(this.coordinates)
  },
  methods: {
    async mapSetup(coordinates) {
      this.map = L.map('map').setView(coordinates, 12)
      await L.tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/light-v10',
          tileSize: 512,
          zoomOffset: -1
        }
      ).addTo(this.map)
      const myIcon = L.divIcon({
        html: '<i class="fas fa-map-marker-alt marker-icon"></i>',
        iconSize: [30, 40]
      })
      const marker = L.marker(coordinates, { icon: myIcon }).addTo(this.map)
      marker.bindPopup(`${this.title}<br>${this.company}`).openPopup()
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
      font-size: $font-icon-lg;
      color: $dark-blue;
    }
  }
}
</style>
