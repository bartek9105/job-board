<template>
  <div class="saved-offers">
    <h1 class="saved-offers__header">
      Saved offers
    </h1>
    <BaseOffersList :offers="getOffers" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseOffersList from '@/components/Base/Offer/BaseOffersList.vue'

export default {
  name: 'ProfileSavedOffers',
  components: {
    BaseOffersList
  },
  computed: {
    ...mapGetters(['getOffers'])
  },
  created() {
    this.fetchOffers({})
  },
  methods: {
    ...mapActions(['fetchOffers'])
  }
}
</script>

<style lang="scss" scoped>
.saved-offers {
  &__header {
    font-weight: $font-semi-bold;
    margin-bottom: $margin-lg;
  }
}
</style>
