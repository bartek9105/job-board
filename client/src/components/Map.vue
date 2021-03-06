<template>
  <div class="map-container">
    <div id="map" :style="{ height: mapHeight + 'px' }" />
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  props: {
    mapHeight: {
      type: Number
    },
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
    },
    offerId: {
      type: String,
      default: () => '602a3a569d6c640df857743d'
    }
  },
  data() {
    return {
      map: {},
      markers: {}
    }
  },
  watch: {
    location: function(newLocation, oldLocation) {
      this.map.remove()
      this.mapSetup([
        newLocation.location.latitude,
        newLocation.location.longitude
      ])
    },
    locations: function(newLocations, oldLocations) {
      this.map.remove()
      this.mapSetup(newLocations, this.offerId)
    },
    offerId: function(newId, oldId) {
      const offer = this.locations.find(location => {
        return location._id === newId
      })
      this.markers[newId]
        .bindPopup(
          `<span class="offer-title">${offer.title}</span><br><span class="offer-salary">${offer.salary.salaryMin} - ${offer.salary.salaryMax} ${offer.salary.currency}</span><br><span class="company-name">${offer.creator.name}</span>`
        )
        .openPopup()
    },
    deep: true
  },
  mounted() {
    this.location
      ? this.mapSetup([
          this.location.location.latitude,
          this.location.location.longitude
        ])
      : this.mapSetup(this.locations)
  },
  methods: {
    async mapSetup(coordinates, offerId) {
      this.map = L.map('map').setView([50, 20], 4)
      await L.tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          minZoom: 2,
          maxZoom: 14,
          id: 'mapbox/light-v10',
          tileSize: 512,
          zoomOffset: -1
        }
      ).addTo(this.map)
      if (this.location) {
        const marker = L.marker(coordinates, {
          icon: L.divIcon({
            html: `<i class="${this.location.mainTechnology.icon} marker-icon"></i>`,
            iconSize: [30, 40]
          })
        }).addTo(this.map)
        marker
          .bindPopup(`${this.location.title}<br>${this.location.creator.name}`)
          .openPopup()
      } else {
        coordinates.map(location => {
          this.markers[location._id] = L.marker(
            [location.location.latitude, location.location.longitude],
            {
              icon: L.divIcon({
                html: `<i class="${location.mainTechnology.icon} marker-icon"></i>`,
                iconSize: [30, 40]
              })
            }
          ).addTo(this.map)
        })
      }
    }
  }
}
</script>

<style lang="scss">
#map {
  width: 100%;
  z-index: 1;
  .leaflet-div-icon {
    border: none;
    background: transparent;
    .marker-icon {
      @include shadow-hover;
      font-size: $font-icon-md;
      background-color: $white;
      border-radius: 50%;
      padding: 0.25rem;
    }
  }
}
.offer-title {
  display: block;
  margin-bottom: -5px;
  color: $dark-blue;
  font-size: $font-content-lg;
  font-weight: $font-bold;
}
.company-name,
.offer-salary {
  color: $dark-blue;
  font-size: $font-content-md;
}
</style>
