<template>
  <div class="dashboard-container">
    <BaseHero />
    <div class="dashboard">
      <h1 class="dashboard__header">
        Offers added by you
      </h1>
      <div v-if="!getIsLoading" class="dashboard__offers">
        <OffersTable :offers="getOffersByUser" />
      </div>
      <BaseSpinner v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import OffersTable from '@/components/Base/Offer/OffersTable'
export default {
  name: 'Dashboard',
  components: {
    OffersTable
  },
  computed: {
    ...mapGetters(['getOffersByUser', 'getIsLoading'])
  },
  mounted() {
    this.fetchOffersByUser()
  },
  methods: {
    ...mapActions(['fetchOffersByUser'])
  }
}
</script>

<style lang="scss">
.dashboard {
  max-width: $nav-width;
  margin: 0 auto;
  padding: $padding-lg 0;
  &__offers {
    margin-top: $margin-md;
  }
}
</style>
