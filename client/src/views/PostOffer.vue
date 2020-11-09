<template>
  <div>
    <Hero>
      <template v-slot:hero-content>
        <Map/>
      </template>
    </Hero>
    <div class="post-offer-form-container">
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import Map from '@/components/Map'

export default {
  name: 'PostOffer',
  components: {
    Hero,
    Map
  }
}
</script>

<style lang="scss">
  .post-offer-form-container {
    padding: 40px 0;
  }
</style>
