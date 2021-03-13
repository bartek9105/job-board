<template>
  <div>
    <JobSearchFiltersMobile
      v-if="mobileFiltersOpen && isMedium"
      @openMobileFilters="mobileFilters"
    />
    <BaseHero hero-height="150">
      <TheNavbar />
      <JobSearch @searchQuery="query" />
    </BaseHero>
    <!--
    <JobSearchMobile
      v-else
      class="hero__job-search-mobile"
      @openMobileFilters="mobileFilters"
    />
    -->
    <main class="offers">
      <section class="offers__list">
        <div class="offers__list__info">
          <span class="offers__list__info__count">
            {{ foundOffersNumber }}
          </span>
          <div v-if="!isMedium">
            <ToggleSwitch @change.native="showMap = !showMap">
              <template v-slot:toggleOn>
                <span>Hide Map </span>
              </template>
              <template v-slot:toggleOff>
                <span>Show Map </span>
              </template>
            </ToggleSwitch>
          </div>
        </div>
        <!-- If map is hidden, display offers list in the center -->
        <div v-if="isOffers">
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
                v-if="!showOfferDetails"
                :is-clickable="!showMap"
                :offers="getOffers"
                @pageChange="pageNumber"
                @offerId="hoveredOfferId"
                @click.native="showOfferDetails = true"
              />
              <BaseMapOffer
                v-if="showOfferDetails"
                :offer-id="offerId"
                @close="closeOfferDetails"
              />
            </div>
            <Map
              :locations="getOffers.data"
              :offer-id="offerId"
              :map-height="650"
            />
          </div>
        </div>
        <BaseNoResults v-else>
          Ughhh... Sorry, we couldn't find any offers with this criteria!
        </BaseNoResults>
      </section>
    </main>
  </div>
</template>

<script>
import JobSearch from '@/components/JobSearch'
import Map from '@/components/Map'
import ToggleSwitch from '@/components/Base/ToggleSwitch'
import BaseNoResults from '@/components/Base/BaseNoResults'
// import JobSearchMobile from '@/components/Mobile/JobSearchMobile'
import JobSearchFiltersMobile from '@/components/Mobile/JobSearchFiltersMobile'
import TheNavbar from '@/components/TheNavbar'
import BaseMapOffer from '@/components/Base/Offer/BaseMapOffer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    JobSearch,
    //  JobSearchMobile,
    JobSearchFiltersMobile,
    Map,
    ToggleSwitch,
    BaseNoResults,
    TheNavbar,
    BaseMapOffer
  },
  data() {
    return {
      queries: {},
      offerId: '',
      showMap: false,
      mobileFiltersOpen: false,
      showOfferDetails: false
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
    },
    closeOfferDetails(isOpened) {
      this.showOfferDetails = isOpened
    }
  },
  computed: {
    ...mapGetters(['getOffers', 'getIsLoading', 'isMedium']),
    foundOffersNumber() {
      return this.getOffers.data
        ? `${this.getOffers.data.length} offers found for specified criteria`
        : null
    },
    isOffers() {
      return this.getOffers.data && this.getOffers.data.length > 0
    }
  },
  created() {
    this.fetchOffers({})
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .offers__list__info {
    margin: $margin-md auto !important;
  }
  .container {
    padding: 0 !important;
    margin-bottom: $margin-md !important;
  }
}

.hero {
  &__job-search-mobile {
    display: flex;
    padding: 0.875rem;
  }
}

.offers {
  &__filters {
    width: 100%;
    background-color: $white;
  }
  &__list {
    padding: 0 $padding-sm;
    &__info {
      @include flex(space-between, center);
      max-width: $container-width;
      margin: 5rem auto 0 auto;
      &__count {
        @include input-name;
      }
    }
  }
  &__map {
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    padding-top: $padding-lg;
    margin-bottom: $margin-lg;
    &__list {
      padding: 0 $padding-sm;
    }
  }
}
</style>
