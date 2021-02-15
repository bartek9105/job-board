<template>
  <div>
    <BaseHero>
      <JobSearch @searchQuery="query" />
    </BaseHero>
    <main>
      <section class="job-search-form">
        <Container>
          <JobSearchForm
            button-text="Search"
            button-text-clear="Clear filters"
            @clicked="formData"
          />
        </Container>
      </section>
      <section>
        <div class="offers-list__offers-info">
          <p class="offers-list__offers-info__count">
            {{ foundOffersNumber }}
          </p>
          <div class="offers-list__offers-info__toggle">
            <span class="offers-list__offers-info__toggle-text">Show map</span>
            <ToggleSwitch @change.native="showMap = !showMap" />
          </div>
        </div>
        <Container v-if="!showMap">
          <div class="offers-list">
            <BaseOffersList
              :offers="getOffers"
              @pageChange="pageNumber"
              @offerId="hoveredOfferId"
            />
          </div>
        </Container>
        <div v-else class="offers-map">
          <div class="offers-list">
            <BaseOffersList
              :offers="getOffers"
              @pageChange="pageNumber"
              @offerId="hoveredOfferId"
            />
          </div>
          <div>
            <Map
              :locations="getOffers.data"
              :offer-id="offerId"
              :map-height="650"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import JobSearchForm from '@/components/Forms/JobSearchForm'
import JobSearch from '@/components/JobSearch'
import Map from '@/components/Map'
import ToggleSwitch from '@/components/Base/ToggleSwitch'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    JobSearchForm,
    JobSearch,
    Map,
    ToggleSwitch
  },
  data() {
    return {
      queries: {},
      offerId: '',
      showMap: false
    }
  },
  methods: {
    ...mapActions(['fetchOffers']),
    hoveredOfferId(offerId) {
      this.offerId = offerId
    },
    formData(queries) {
      this.queries = { ...this.queries, ...queries }
      this.fetchOffers(this.queries)
    },
    pageNumber(page) {
      this.queries = { ...this.queries, page: page }
      this.fetchOffers(this.queries)
    },
    query(queryTitle) {
      this.queries = { ...this.queries, title: queryTitle }
      this.fetchOffers(this.queries)
    }
  },
  computed: {
    ...mapGetters(['getOffers', 'getIsLoading']),
    foundOffersNumber() {
      return this.getOffers.data
        ? `${this.getOffers.data.length} offers found for specified criteria`
        : null
    }
  },
  created() {
    this.fetchOffers({})
  }
}
</script>

<style lang="scss" scoped>
.job-search-form {
  background-color: $white;
}
.offers-list {
  &__offers-info {
    @include flex(space-between, center);
    max-width: $container-width;
    margin: $margin-lg auto;
    &__count {
      color: $dark-blue;
      font-weight: $font-bold;
      font-size: $font-content-lg;
      text-transform: uppercase;
    }
    &__toggle {
      @include flex(null, center);
    }
    &__toggle-text {
      margin-right: 1rem;
      font-weight: $font-bold;
      text-transform: uppercase;
      font-size: $font-content-lg;
    }
  }
}
.offers-map {
  width: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
  padding-top: $padding-lg;
  margin-bottom: $margin-lg;
  .offers-list {
    padding: 0 $padding-sm;
  }
}
</style>
