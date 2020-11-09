<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  methods: {
    mapSetup () {
      const coordinates = [50, 20]
      const map = L.map('map').setView(coordinates, 12)
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1

      }).addTo(map)
      const myIcon = L.divIcon({ html: '<i class="fas fa-map-marker-alt marker-icon"></i>', iconSize: [30, 40] })
      const marker = L.marker(coordinates, { icon: myIcon }).addTo(map)
      marker.bindPopup('I\'m a popup!').openPopup()
    }
  },
  mounted () {
    this.mapSetup()
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
