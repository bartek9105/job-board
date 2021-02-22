<template>
  <div>
    <JobSearchFiltersMobile
      v-if="mobileFiltersOpen"
      @openMobileFilters="mobileFilters"
    />
    <div v-else>
      <BaseHero class="hero">
        <JobSearch @searchQuery="query" />
      </BaseHero>
      <JobSearchMobile
        class="job-search-mobile"
        @openMobileFilters="mobileFilters"
      />
      <main class="offers">
        <section class="offers__filters">
          <Container>
            <JobSearchForm
              button-text="Search"
              button-text-clear="Clear filters"
              @clicked="formData"
            />
          </Container>
        </section>
        <section class="offers__list">
          <div class="offers__list__info">
            <span class="offers__list__info__count">
              {{ foundOffersNumber }}
            </span>
            <div class="offers__list__info__map-toggle">
              <span v-if="!showMap" class="offers__list__info__map-toggle__text"
                >Show map</span
              >
              <span v-else class="offers__list__info__map-toggle__text"
                >Hide map</span
              >
              <ToggleSwitch @change.native="showMap = !showMap" />
            </div>
          </div>
          <!-- If map is hidden, display offers list in the center -->
          <Container v-if="!showMap">
            <BaseOffersList
              :offers="getOffers"
              @pageChange="pageNumber"
              @offerId="hoveredOfferId"
            />
          </Container>
          <!-- If map is shown, display offers list on the left side and map on the right side -->
          <div v-else class="offers__map">
            <div class="offers__map__list">
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
  </div>
</template>

<script>
import JobSearchForm from '@/components/Forms/JobSearchForm'
import JobSearch from '@/components/JobSearch'
import Map from '@/components/Map'
import ToggleSwitch from '@/components/Base/ToggleSwitch'
import JobSearchMobile from '@/components/Mobile/JobSearchMobile'
import JobSearchFiltersMobile from '@/components/Mobile/JobSearchFiltersMobile'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    JobSearchForm,
    JobSearch,
    JobSearchMobile,
    JobSearchFiltersMobile,
    Map,
    ToggleSwitch
  },
  data() {
    return {
      queries: {},
      offerId: '',
      showMap: false,
      mobileFiltersOpen: false
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
    query({ title, location }) {
      this.queries = { ...this.queries, title, location }
      this.fetchOffers(this.queries)
    },
    mobileFilters(isOpened) {
      this.mobileFiltersOpen = isOpened
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
@media (max-width: 750px) {
  .hero {
    display: none;
  }
  .job-search-mobile {
    display: flex !important;
    padding: $padding-sm;
  }
  .offers__list__info__map-toggle {
    display: none !important;
  }
  .offers__list__info {
    margin: $margin-md auto !important;
  }
  .container {
    padding: 0 !important;
    margin-bottom: $margin-md !important;
  }
}
.job-search-mobile {
  display: none;
}
.offers {
  &__filters {
    width: 100%;
    background-color: $white;
    @media (max-width: 750px) {
      display: none;
    }
  }
  &__list {
    padding: 0 $padding-sm;
    &__info {
      @include flex(space-between, center);
      max-width: $container-width;
      margin: $margin-lg auto;
      &__count {
        @include input-name;
      }
      &__map-toggle {
        @include flex(null, center);
        &__text {
          margin-right: 1rem;
          @include input-name;
        }
      }
    }
  }
  &__map {
    width: 100%;
    display: grid;
    grid-template-columns: 60% 40%;
    padding-top: $padding-lg;
    margin-bottom: $margin-lg;
    &__list {
      padding: 0 $padding-sm;
    }
  }
}
</style>
