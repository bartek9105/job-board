<template>
  <div v-if="!isLoading" class="similar-offers-container">
    <div v-for="offer in getOffers" :key="offer._id">
      <BaseOffer :offer="offer" />
    </div>
  </div>
</template>

<script>
import BaseOffer from '@/components/Base/BaseOffer'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SimilarOffers',
  components: {
    BaseOffer
  },
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

<style lang="scss" scoped>
.similar-offers-container {
  max-width: $container-width;
  margin: 0 auto;
}
</style>
