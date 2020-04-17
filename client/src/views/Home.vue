<template>
  <div>
    <Navbar/>
    <Hero/>
    <div class="bg-gray-200 flex justify-center py-8">
      <JobOffer/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import JobOffer from '@/components/JobOffer'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    JobOffer
  }
}
</script>
