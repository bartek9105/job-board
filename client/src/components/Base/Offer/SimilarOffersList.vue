<template>
  <div>
    <BaseOffersList :offers="getOffers" @pageChange="pageNumber" />
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
    ...mapActions(['fetchOffers']),
    pageNumber(page) {
      this.fetchOffers({ category: this.category, page })
    }
  },
  computed: {
    ...mapGetters(['getOffers'])
  },
  watch: {
    category: function() {
      this.fetchOffers({ category: this.category })
    }
  }
}
</script>
