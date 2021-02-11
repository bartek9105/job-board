<template>
  <div v-if="!isLoading">
    <BaseOffersList :offers="getOffers" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SimilarOffersList',
  props: {
    category: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    ...mapActions(['fetchOffers'])
  },
  computed: {
    ...mapGetters(['getOffers'])
  },
  watch: {
    category: function() {
      this.fetchOffers({ category: this.category }).then(() => {
        this.isLoading = false
      })
    }
  }
}
</script>
