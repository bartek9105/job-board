<template>
  <div class="offer">
    <Hero>
      <template v-slot:hero-content>
        <div class="offer-hero-container">
          <div class="offer-hero-container-inner">
            <img :src="'https://picsum.photos/100'" alt="logo" class="offer__logo">
            <div class="offer-hero-details-container">
              <h1 class="offer__title">{{ getJobOffer.title }}</h1>
              <span class="offer__location">
                <font-awesome-icon icon="map-marker-alt" class="offer__icon"></font-awesome-icon>
                {{ getJobOffer.location }}
              </span>
              <div class="offer-hero-details-container-row">
                <span class="offer__pay">
                  <font-awesome-icon icon="money-bill-wave" class="offer__icon"></font-awesome-icon>
                  {{ getJobOffer.salaryMin }} - {{ getJobOffer.salaryMax }}
                </span>
                <span class="offer__contract">
                  <font-awesome-icon icon="file-signature" class="offer__icon"></font-awesome-icon>
                  {{ getJobOffer.contract }}
                </span>
                <span class="offer__type">
                  <font-awesome-icon icon="clock" class="offer__icon"></font-awesome-icon>
                  {{ getJobOffer.type }}
                </span>
                <span class="offer__category">{{ getJobOffer.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Hero>
    <main class="main-section">
      <div class="offer-details-container">
        <section class="offer-details-section">
          <h2 class="offer__header">Job Description</h2>
          <p v-html="getJobOffer.description"></p>
        </section>
        <section class="offer-details-section">
          <h2 class="offer__header">Technologies</h2>
          <div class="offer-tag-container">
            <div class="offer__tag" v-for="(technology, index) in getJobOffer.technologies" :key="index">{{ technology }}</div>
          </div>
        </section>
        <section class="offer-details-section">
          <h2 class="offer__header">Benefits</h2>
          <ul ckass="offer__benefits__list">
            <li v-for="(benefit, index) in getJobOffer.benefits" :key="index">
              <font-awesome-icon icon="check-circle" class="offer__icon offer__icon--green"></font-awesome-icon>
              {{ benefit }}
            </li>
          </ul>
        </section>
        <section class="offer-details-section">
          <h2 class="offer__header">Apply form</h2>
          <ApplyForm />
        </section>
        <div class="btn-container">
          <Button class="btn">Apply</Button>
          <ClearBtn>Reset form</ClearBtn>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Hero from '../components/Hero'
import Button from '../components/Base/Button'
import ClearBtn from '../components/Base/ClearBtn'
import ApplyForm from '../components/ApplyForm'

export default {
  name: 'SingleOffer',
  components: {
    Hero,
    Button,
    ClearBtn,
    ApplyForm
  },
  methods: {
    ...mapActions(['fetchJobOffer'])
  },
  computed: {
    ...mapGetters(['getJobOffer'])
  },
  mounted () {
    this.fetchJobOffer(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
  .offer-hero-container{
    max-width: $container-width;
    margin: 0 auto;
    color: $white;
    height: calc(100% - $nav-height);
    @include flex-center-y;
    .offer-hero-container-inner {
      display: flex;
      .offer-hero-details-container {
        @include flex-col;
        justify-content: space-between;
        font-size: $font-content-md;
        color: $white-blue;
      }
    }
  }
  .offer-details-container {
    @include shadow;
    max-width: $container-width;
    position: relative;
    top: -30px;
    margin: 0 auto;
    background: $white;
    font-size: $font-content-md;
    line-height: 24px;
    padding: $main-content-pd-tb-lg 40px;
    .offer-details-container-row {
      display: flex;
    }
  }
  .main-section {
    background: $bg-grey;
  }
  .offer-details-section {
    margin-bottom: $section-m-md;
  }
  .offer {
    span {
      margin-right: 15px;
    }
    &__logo {
      margin-right: 50px;
      border-radius: 100%;
    }
    &__title {
      font-size: 22px;
    }
    &__header {
      margin-bottom: $section-m-md;
    }
    &__tag {
      @include tag;
      @include tag-dark;
      margin-right: 10px;
    }
    &__icon {
      font-size: $font-content-lg;
      margin-right: 10px;
      &--green {
        color: green;
      }
    }
    &__category {
      @include tag;
      @include tag-light;
    }
  }
  .offer-tag-container {
    display: flex;
  }
  .btn-container {
    .btn {
      margin-right: 20px;
    }
  }
</style>
