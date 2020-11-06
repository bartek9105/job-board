<template>
  <div>
    <Hero>
      <template v-slot:hero-content>
      </template>
    </Hero>
    <div class="post-offer-form-container">
      <JobPostForm/>
    </div>
  </div>
</template>

<script>
import Hero from '@/components/Hero'
import JobPostForm from '@/components/JobPostForm'

export default {
  name: 'PostOffer',
  components: {
    Hero,
    JobPostForm
  }
}
</script>

<style lang="scss">
  .post-offer-form-container {
    padding: 40px 0;
  }
</style>
