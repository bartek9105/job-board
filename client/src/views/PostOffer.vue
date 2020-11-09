<template>
  <div>
    <Hero>
      <template v-slot:hero-content>
        <Map/>
      </template>
    </Hero>
    <div class="post-offer-form-container">
      <JobPostForm class="post-offer-form"/>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import Map from '@/components/Map'
import JobPostForm from '@/components/JobPostForm'

export default {
  name: 'PostOffer',
  components: {
    Hero,
    Map,
    JobPostForm
  }
}
</script>

<style lang="scss">
  .post-offer-form-container {
    background: $bg-grey;
    padding: 40px;
  .post-offer-form {
      @include app-container-width;
      @include shadow;
      margin: 0 auto;
    }
  }
</style>
