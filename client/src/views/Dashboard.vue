<template>
  <div class="dashboard-container">
    <Navbar />
    <div class="dashboard">
      <h1 class="dashboard__header">
        Offers added by you
      </h1>
      <div class="dashboard__offers">
        <div v-for="offer in getOffersByUser" :key="offer._id">
          <router-link :to="'/offer/' + offer._id">
            <JobOffer :offer="offer" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '@/components/Navbar'
import JobOffer from '@/components/JobOffer'
export default {
  name: 'Dashboard',
  components: {
    Navbar,
    JobOffer
  },
  computed: {
    ...mapGetters(['getOffersByUser'])
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
.dashboard-container {
  background-color: $bg-grey;
}
.dashboard {
  max-width: $container-width;
  margin: 0 auto;
  padding: $padding-lg 0;
  &__offers {
    margin-top: $margin-md;
  }
}
</style>
