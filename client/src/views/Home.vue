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
    <main>
      <JobSearchForm/>
      <JobOffers/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import JobOffers from '@/components/JobOffers'
import JobSearchForm from '@/components/JobSearchForm'
import JobSearch from '@/components/JobSearch'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    JobOffers,
    JobSearchForm,
    JobSearch
  }
}
</script>
