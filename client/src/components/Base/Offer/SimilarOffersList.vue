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
    },
    excludedOfferId: String
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
    ...mapGetters(['getOffers']),
    compundProperty() {
      return [this.category, this.excludedOfferId].join()
    }
  },
  watch: {
    compundProperty: {
      immediate: true,
      handler: function() {
        this.fetchOffers({ category: this.category, _id: this.excludedOfferId })
      }
    }
  }
}
</script>
