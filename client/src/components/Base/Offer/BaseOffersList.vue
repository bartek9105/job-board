<template>
  <div>
    <div v-if="!getIsLoading">
      <div v-for="offer in offers.data" :key="offer._id">
        <router-link
          :event="isClickable ? 'click' : ''"
          :to="{
            name: 'OfferDetails',
            params: { slug: offer.slug }
          }"
        >
          <BaseOffer
            :offer="offer"
            @mouseover.native="emitOfferId(offer._id)"
          />
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
import { mapGetters } from 'vuex'
import BaseOffer from '@/components/Base/Offer/BaseOffer'

export default {
  name: 'BaseOffersList',
  components: {
    BaseOffer
  },
  props: {
    offers: {
      type: Object,
      default: () => {}
    },
    isClickable: {
      type: Boolean,
      default: () => true
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
