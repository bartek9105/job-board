<template>
  <div>
    <Hero>
      <template v-slot:hero-content>
        <Map :location="location"/>
      </template>
    </Hero>
    <div class="post-offer-form-container">
      <div class="post-offer-form">
        <h3 class="post-offer-form__heading">Post your job offer</h3>
        <JobPostForm class="post-offer-form" @location="locationData"/>
      </div>
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
  },
  data () {
    return {
      location: '',
      title: ''
    }
  },
  methods: {
    locationData (location) {
      this.location = location
    }
  }
}
</script>

<style lang="scss">
  .post-offer-form-container {
    background: $bg-grey;
    padding: $main-content-pd-tb-lg 40px;
    .post-offer-form {
      max-width: $container-width;
      margin: 0 auto;
        &__heading {
          margin-bottom: $section-m-md;
        }
      }
  }
</style>
