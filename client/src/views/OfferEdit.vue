<template>
  <div>
    <Navbar />
    <div class="offer-edit-container">
      <h1>Edit offer</h1>
      <OfferForm :offer="offer" btn-text="Edit offer" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OfferForm from '@/components/OfferForm'
import Navbar from '@/components/Navbar'
export default {
  name: 'OfferEdit',
  components: {
    OfferForm,
    Navbar
  },
  computed: {
    ...mapGetters(['getOffersByUser']),
    offer() {
      return this.getOffersByUser.find(
        offer => offer._id === this.$route.params.id
      )
    }
  }
}
</script>

<style lang="scss">
.offer-edit-container {
  max-width: $container-width;
  margin: 0 auto;
}
</style>
