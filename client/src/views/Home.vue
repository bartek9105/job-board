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
      <JobOffer/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import JobOffer from '@/components/JobOffer'
import JobSearchForm from '@/components/JobSearchForm'
import JobSearch from '@/components/JobSearch'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    JobOffer,
    JobSearchForm,
    JobSearch
  }
}
</script>
