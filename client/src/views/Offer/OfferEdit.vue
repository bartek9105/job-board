<template>
  <div>
    <BaseHero />
    <div class="offer-edit-container">
      <div class="offer-edit-form-container">
        <h1 class="offer-edit__title">
          Edit offer
        </h1>
        <OfferForm
          :offer="offer"
          btn-text="Edit offer"
          :save-offer="saveOffer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OfferForm from '@/components/Forms/Offer/OfferForm'
export default {
  name: 'OfferEdit',
  components: {
    OfferForm
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
  background-color: $bg-grey;
}
.offer-edit-form-container {
  max-width: $container-width;
  margin: 0 auto;
  padding: $padding-md 0;
}

.offer-edit {
  &__title {
    margin-bottom: $margin-md;
  }
}
</style>
