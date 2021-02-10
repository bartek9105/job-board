<template>
  <div>
    <div v-for="offer in offers" :key="offer._id">
      <router-link
        :to="{
          name: 'OfferDetails',
          params: { offerId: offer._id, slug: offer.slug }
        }"
      >
        <JobOffer :offer="offer" />
      </router-link>
    </div>
  </div>
</template>

<script>
import JobOffer from '@/components/Base/BaseOffer'

export default {
  name: 'BaseOffersList',
  components: {
    JobOffer
  },
  props: {
    offers: Array
  }
}
</script>

<style></style>
