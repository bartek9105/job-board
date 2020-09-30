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
        <JobOffer
          v-for="offer in getJobOffers"
          :key="offer._id"
          :offer="offer"/>
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

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    JobOffer,
    JobSearchForm,
    JobSearch
  },
  methods: {
    ...mapActions(['fetchJobOffers'])
  },
  computed: {
    ...mapGetters(['getJobOffers'])
  },
  mounted () {
    this.fetchJobOffers()
  }
}
</script>

<style lang="scss">
  .main-section {
    background: $bg-grey;
    .offers {
      max-width: 1087px;
      margin: 0 auto;
    }
    .job-search-form {
      background: #fff;
      margin-bottom: 50px;
      padding: 50px 0;
}
  }
</style>
