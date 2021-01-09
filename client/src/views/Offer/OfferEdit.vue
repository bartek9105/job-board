<template>
  <div>
    <TheNavbar />
    <div class="offer-edit-container">
      <h1>Edit offer</h1>
      <OfferForm :offer="offer" btn-text="Edit offer" :save-offer="saveOffer" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OfferForm from '@/components/Forms/Offer/OfferForm'
import TheNavbar from '@/components/TheNavbar'
export default {
  name: 'OfferEdit',
  components: {
    OfferForm,
    TheNavbar
  },
  computed: {
    ...mapGetters(['getOffersByUser']),
    offer() {
      return this.getOffersByUser.find(
        offer => offer._id === this.$route.params.id
      )
    }
  },
  methods: {
    ...mapActions(['editOffer']),
    saveOffer() {
      this.editOffer(this.offer)
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
