<template>
  <div>
    <Hero>
      <template v-slot:hero-content>
        <JobSearch/>
      </template>
    </Hero>
    <main class="main-section">
      <div class="job-search-form">
        <JobSearchForm @clicked="formData"/>
      </div>
      <div class="offers">
        <p class="offers__offers-info">
          {{ getJobOffers.total }} offers found for specified criteria
        </p>
        <JobOffer
          v-for="offer in getJobOffers.data"
          :key="offer._id"
          :offer="offer"
        />
        <Pagination v-if="getJobOffers.data.length > 0" @pageChange="pageNumber" :pages="getJobOffers.pages" class="offers__pagination"/>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import JobOffer from '@/components/JobOffer'
import JobSearchForm from '@/components/JobSearchForm'
import JobSearch from '@/components/JobSearch'
import Pagination from '@/components/Pagination'
import Footer from '@/components/Footer'

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
    Pagination,
    Footer
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
      max-width: 1087px;
      margin: 0 auto;
      padding: 50px 0;
      &__offers-info {
        color: $theme-dark-blue;
        font-weight: 700;
        font-size: 14px;
        text-transform: uppercase;
        margin-bottom: 50px;
      }
      &__pagination {
        margin-top: 50px;
      }
    }
    .job-search-form {
      background: #fff;
      width: 100%;
      padding: 50px 0;
}
  }
</style>
