<template>
  <div>
    <Hero>
      <template v-slot:hero-content>
        <Map :location="location" />
      </template>
    </Hero>
    <div class="post-offer-form-container">
      <div class="post-offer-form">
        <h3 class="post-offer-form__heading">
          Post your job offer
        </h3>
        <OfferForm
          class="post-offer-form"
          :offer="offer"
          :save-offer="addOffer"
          @location="locationData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Hero from '@/components/Hero'
import Map from '@/components/Map'
import OfferForm from '@/components/OfferForm'

export default {
  name: 'PostOffer',
  components: {
    Hero,
    Map,
    OfferForm
  },
  data() {
    return {
      location: '',
      title: '',
      offer: {}
    }
  },
  methods: {
    ...mapActions(['addJobOffer']),
    locationData(location) {
      this.location = location
    },
    addOffer() {
      this.addJobOffer(this.offer).then(() => {
        this.$refs.checkoutRef.redirectToCheckout()
      })
    }
  }
}
</script>

<style lang="scss">
.post-offer-form-container {
  background: $bg-grey;
  padding: $padding-lg 40px;
  .post-offer-form {
    max-width: $container-width;
    margin: $margin-center;
    &__heading {
      margin-bottom: $margin-md;
    }
  }
}
</style>
