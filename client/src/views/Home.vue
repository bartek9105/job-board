<template>
  <div>
    <header>
      <Hero>
        <template v-slot:nav>
          <Navbar/>
        </template>
        <template v-slot:search>
          <JobSearch/>
        </template>
      </Hero>
    </header>
    <main class="main-section">
      <div class="job-search-form">
        <JobSearchForm/>
      </div>
      <div class="offers">
        <p class="offers__offers-info">
          {{ getJobOffers.length }} offers found for specified criteria
        </p>
        <JobOffer
          v-for="offer in getJobOffers"
          :key="offer._id"
          :offer="offer"
        />
        <Pagination class="offers__pagination"/>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import JobOffer from '@/components/JobOffer'
import JobSearchForm from '@/components/JobSearchForm'
import JobSearch from '@/components/JobSearch'
import Pagination from '@/components/Pagination'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    JobOffer,
    JobSearchForm,
    JobSearch,
    Pagination
  },
  methods: {
    ...mapActions(['fetchJobOffers'])
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
      margin-bottom: 50px;
      padding: 50px 0;
}
  }
</style>
