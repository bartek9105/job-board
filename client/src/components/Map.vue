<template>
  <div>
    <l-map
      :style="{ height: mapHeight + 'px' }"
      :zoom="zoom"
      :center="center"
      class="map"
    >
      <l-tile-layer :url="url" :options="options" />
      <div v-for="(marker, index) in markers" :key="index">
        <l-marker
          ref="marker"
          :options="{ id: marker.id }"
          :lat-lng="marker.coordinates"
          :icon="getIcon(marker.icon)"
          @click="$emit('offerId', marker.id)"
        >
          <l-tooltip>{{ marker.title }}</l-tooltip>
        </l-marker>
      </div>
    </l-map>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  props: {
    mapHeight: {
      type: Number,
      default: 300
    },
    offers: {
      type: Array,
      default: () => []
    },
    offerId: {
      type: String,
      default: () => ''
    },
    offer: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      markers: [],
      markersObj: [],
      url: `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`,
      zoom: 5,
      center: [50, 20],
      options: {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 2,
        maxZoom: 14,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1
      }
    }
  },
  watch: {
    offerId: function() {
      const index = this.markersObj.findIndex(
        obj => obj.options.id === this.offerId
      )
      this.markersObj.map(marker => marker.closeTooltip())
      this.markersObj[index].toggleTooltip()
    }
  },
  mounted() {
    this.checkMapType()
    this.$nextTick(
      () => (this.markersObj = this.$refs.marker.map(ref => ref.mapObject))
    )
  },
  methods: {
    checkMapType() {
      if (!this.offer) {
        this.offers.map(offer => this.markersSetup(offer))
      } else {
        this.markersSetup(this.offer)
      }
    },
    markersSetup(offer) {
      this.markers.push({
        id: offer._id,
        icon: offer.mainTechnology.icon,
        title: offer.title,
        coordinates: [offer.location.latitude, offer.location.longitude]
      })
    },
    getIcon(technology) {
      return L.divIcon({
        html: `<i class="${technology} marker-icon"></i>`
      })
    }
  }
}
</script>

<style lang="scss">
.map {
  z-index: 0;
}
.marker-icon {
  @include shadow-hover;
  font-size: $font-icon-md;
  background-color: $white;
  border-radius: 50%;
  padding: 0.25rem;
}
.leaflet-div-icon {
  border: none;
  background: transparent;
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
