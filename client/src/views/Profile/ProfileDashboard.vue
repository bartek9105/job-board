<template>
  <div>
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <OffersTable :offers="getOffersByUser" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OffersTable from '@/components/Base/Offer/OffersTable.vue'

export default {
  name: 'ProfileDashboard',
  components: {
    OffersTable
  },
  computed: {
    ...mapGetters(['getOffersByUser'])
  },
  methods: {
    ...mapActions(['fetchOffersByUser'])
  },
  created() {
    this.fetchOffersByUser()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  @include shadow;
  background-color: $white;
  border-radius: $border-radius-sm;
  padding: $padding-lg;
  h1 {
    font-weight: $font-semi-bold;
    margin-bottom: $margin-lg;
  }
}
</style>
