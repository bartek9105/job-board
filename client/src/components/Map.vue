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
    location: {
      type: Object
    },
    title: {
      type: String,
      default: () => 'Offer title'
    },
    company: {
      type: String,
      default: () => 'Company name'
    },
    locations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      map: {}
    }
  },
  watch: {
    location: function(newLocation, oldLocation) {
      this.map.remove()
      this.mapSetup([newLocation.latitude, newLocation.longitude])
    },
    locations: function(newLocations, oldLocations) {
      this.map.remove()
      this.mapSetup(newLocations)
    },
    deep: true
  },
  mounted() {
    this.location
      ? this.mapSetup([this.location.latitude, this.location.longitude])
      : this.mapSetup(this.locations)
  },
  methods: {
    async mapSetup(coordinates) {
      this.map = L.map('map').setView([50, 20], 4)
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
      if (this.location) {
        const marker = L.marker(coordinates, { icon: myIcon }).addTo(this.map)
        marker.bindPopup(`${this.title}<br>${this.company}`).openPopup()
      } else {
        coordinates.map(location => {
          const marker = L.marker(
            [location.location.latitude, location.location.longitude],
            { icon: myIcon }
          ).addTo(this.map)
          marker.bindPopup(`${location.title}<br>${location.creator.name}`)
        })
      }
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
