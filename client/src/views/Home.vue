<template>
  <div>
    <Hero>
      <template v-slot:hero-content>
        <JobSearch/>
      </template>
    </Hero>
    <main class="main-section">
      <div class="job-search-form">
        <JobSearchForm @clicked="formData" buttonText="Search" buttonTextClear="Clear filters"/>
      </div>
      <div class="offers" v-if="getJobOffers.data">
        <p class="offers__offers-info">
          {{ getJobOffers.total }} offers found for specified criteria
        </p>
        <div v-for="offer in getJobOffers.data" :key="offer._id">
          <router-link :to="'/offer/' + offer._id">
            <JobOffer :offer="offer" />
          </router-link>
        </div>
        <Pagination v-if="getJobOffers.data.length > 0" @pageChange="pageNumber" :pages="getJobOffers.pages" class="offers__pagination"/>
      </div>
    </main>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import JobOffer from '@/components/JobOffer'
import JobSearchForm from '@/components/JobSearchForm'
import JobSearch from '@/components/JobSearch'
import Pagination from '@/components/Pagination'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      queries: {}
    }
  },
  components: {
    Hero,
    JobOffer,
    JobSearchForm,
    JobSearch,
    Pagination
  },
  methods: {
    ...mapActions(['fetchJobOffers']),
    formData (queries) {
      this.queries = queries
      this.fetchJobOffers(this.queries)
    },
    pageNumber (page) {
      this.queries = { ...this.queries, page: page }
      this.fetchJobOffers(this.queries)
    }
  },
  computed: {
    ...mapGetters(['getJobOffers'])
  },
  mounted () {
    this.fetchJobOffers({})
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
        font-size: $font-content-md;
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
