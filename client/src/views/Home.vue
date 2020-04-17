<template>
  <div>
    <Navbar/>
    <Hero/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero
  }
}
</script>
