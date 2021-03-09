<template>
  <div class="map-offer">
    {{ getOffer.title }}
    {{ getOffer.category }}
    {{ getOffer.seniority }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BaseMapOffer',
  props: {
    offerId: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['getOffer'])
  },
  created() {
    this.fetchOffer(this.offerId)
  },
  methods: {
    ...mapActions(['fetchOffer'])
  }
}
</script>

<style lang="scss" scoped></style>
