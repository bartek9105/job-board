<template>
  <div>
    <div v-if="!getIsLoading">
      <div v-for="offer in offers.data" :key="offer._id">
        <router-link
          :to="{
            name: 'OfferDetails',
            params: { offerId: offer._id, slug: offer.slug }
          }"
        >
          <JobOffer :offer="offer" @mouseover.native="emitOfferId(offer._id)" />
        </router-link>
      </div>
    </div>
    <BaseSpinner v-else />
    <Pagination
      :pages="offers.pages"
      class="pagination"
      @pageChange="pageNumber"
    />
  </div>
</template>

<script>
import JobOffer from '@/components/Base/Offer/BaseOffer'
import { mapGetters } from 'vuex'

export default {
  name: 'BaseOffersList',
  components: {
    JobOffer
  },
  props: {
    offers: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      page: Number
    }
  },
  computed: {
    ...mapGetters(['getIsLoading'])
  },
  watch: {
    page: function() {
      this.$emit('pageChange', this.page)
    }
  },
  methods: {
    pageNumber(page) {
      this.page = page
    },
    emitOfferId(offerId) {
      this.$emit('offerId', offerId)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: $margin-lg;
}
</style>
