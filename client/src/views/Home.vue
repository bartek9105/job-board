<template>
  <div>
    <Navbar/>
    <HeroBg/>
    <JobSearchForm/>
    <div class="bg-gray-200 flex items-center flex-col py-8">
      <JobOffers/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import HeroBg from '@/components/HeroBg'
import JobOffers from '@/components/JobOffers'
import JobSearchForm from '@/components/JobSearchForm'

export default {
  name: 'Home',
  components: {
    Navbar,
    HeroBg,
    JobOffers,
    JobSearchForm
  }
}
</script>
