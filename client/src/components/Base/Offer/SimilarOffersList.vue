<template>
  <div>
    <BaseOffersList
      v-if="getOffers.data.length > 0"
      :offers="getOffers"
      @pageChange="pageNumber"
    />
    <BaseNoResults v-else>
      No similar offers found
    </BaseNoResults>
  </div>
</template>

<script>
import BaseNoResults from '@/components/Base/BaseNoResults'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SimilarOffersList',
  components: {
    BaseNoResults
  },
  props: {
    category: {
      type: Object,
      default: () => {}
    },
    excludedOfferId: String
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['getOffers']),
    compundProperty() {
      return [this.category.name, this.excludedOfferId].join()
    }
  },
  watch: {
    compundProperty: {
      immediate: true,
      handler: function() {
        this.fetchOffers({
          category: this.category.name,
          _id: this.excludedOfferId
        })
      }
    }
  },
  methods: {
    ...mapActions(['fetchOffers']),
    pageNumber(page) {
      this.fetchOffers({ category: this.category.name, page })
    }
  }
}
</script>
