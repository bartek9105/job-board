<template>
  <div>
    <BaseHero>
      <template v-slot:hero-content>
        <JobSearch />
      </template>
    </BaseHero>
    <main class="main-section">
      <div class="job-search-form">
        <JobSearchForm
          button-text="Search"
          button-text-clear="Clear filters"
          @clicked="formData"
        />
      </div>
      <div v-if="getOffers.data" class="offers">
        <p class="offers__offers-info">
          {{ getOffers.total }} offers found for specified criteria
        </p>
        <div v-for="offer in getOffers.data" :key="offer._id">
          <router-link :to="'/offer/' + offer._id">
            <JobOffer :offer="offer" />
          </router-link>
        </div>
        <Pagination
          v-if="getOffers.data.length > 0"
          :pages="getOffers.pages"
          class="offers__pagination"
          @pageChange="pageNumber"
        />
      </div>
    </main>
  </div>
</template>

<script>
import BaseHero from '@/components/Base/BaseHero'
import JobOffer from '@/components/Base/BaseOffer'
import JobSearchForm from '@/components/Forms/JobSearchForm'
import JobSearch from '@/components/JobSearch'
import Pagination from '@/components/Pagination'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    BaseHero,
    JobOffer,
    JobSearchForm,
    JobSearch,
    Pagination
  },
  data() {
    return {
      queries: {}
    }
  },
  methods: {
    ...mapActions(['fetchOffers']),
    formData(queries) {
      this.queries = queries
      this.fetchOffers(this.queries)
    },
    pageNumber(page) {
      this.queries = { ...this.queries, page: page }
      this.fetchOffers(this.queries)
    }
  },
  computed: {
    ...mapGetters(['getOffers'])
  },
  mounted() {
    this.fetchOffers({})
  }
}
</script>

<style lang="scss">
.main-section {
  background: $bg-grey;
  .offers {
    max-width: $container-width;
    margin: $margin-center;
    padding: $padding-lg 0;
    &__offers-info {
      color: $dark-blue;
      font-weight: $font-bold;
      font-size: $font-content-lg;
      text-transform: uppercase;
      margin-bottom: $margin-lg;
    }
    &__pagination {
      margin-top: $margin-lg;
    }
  }
  .job-search-form {
    background: $white;
    width: 100%;
    padding: $padding-lg 0;
  }
}
</style>
