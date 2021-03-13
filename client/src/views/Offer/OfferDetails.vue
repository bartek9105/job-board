<template>
  <div v-if="Object.entries(getOffer).length > 0" class="offer">
    <BaseOfferSummary v-if="displayOfferSummary" :offer="getOffer" />
    <BaseHero hero-height="250">
      <TheNavbar />
      <HeroContentContainer>
        <template v-slot:logo>
          <BaseCompanyLogo
            v-if="Object.entries(getOffer).length > 0"
            :avatar-url="getOffer.creator.avatarUrl"
            :img-width="100"
            :img-height="100"
          />
        </template>
        <template v-if="!getIsLoading" v-slot:details>
          <h1>{{ getOffer.title }}</h1>
          <div>
            <span>
              <map-pin-icon size="1.25x" />
              {{ getOffer.location.city }}
            </span>
            <span v-if="getOffer.isRemote">
              Remote
            </span>
          </div>
          <div>
            <span>
              {{ salaryRange }}
            </span>
            <span>
              <briefcase-icon size="1.25x" />
              {{ getOffer.contract }}
            </span>
            <span>
              <clock-icon size="1.25x" />
              {{ getOffer.type }}
            </span>
            <span class="offer__category">{{ getOffer.category.name }}</span>
          </div>
        </template>
        <template v-else v-slot:details>
          <BaseSpinner />
        </template>
      </HeroContentContainer>
    </BaseHero>
    <main>
      <ContentContainer class="wrapper">
        <div class="offer-details-container">
          <div v-if="!getIsLoading" class="offer-details-offer-info">
            <section class="offer-details-section">
              <div class="offer__go-back-btn">
                <router-link to="/">
                  <BaseGoBackButton />
                </router-link>
              </div>
              <h3 class="offer__header">
                Job Description
              </h3>
              <p v-html="getOffer.description" />
            </section>
            <section class="offer-details-section">
              <h3 class="offer__header">
                Technologies
              </h3>
              <div class="offer-tag-container">
                <div
                  v-for="(technology, index) in getOffer.technologies"
                  :key="index"
                  class="offer__tag"
                >
                  {{ technology.name }}
                </div>
              </div>
            </section>
            <section class="offer-details-section">
              <h3 class="offer__header">
                Benefits
              </h3>
              <ul ckass="offer__benefits__list">
                <li v-for="(benefit, index) in getOffer.benefits" :key="index">
                  <check-circle-icon
                    size="1.5x"
                    class="offer__icon offer__icon--green"
                  />
                  {{ benefit.name }}
                </li>
              </ul>
            </section>
            <div class="btn-container">
              <BaseButton class="btn">
                Apply
              </BaseButton>
            </div>
            <section>
              <Map
                v-if="Object.entries(getOffer).length > 0"
                class="offer__map"
                :location="getOffer"
                :title="getOffer.title"
                :company="getOffer.creator.name"
                :map-height="300"
              />
            </section>
          </div>
          <BaseSpinner v-else />
        </div>
      </ContentContainer>
    </main>
    <section>
      <Container>
        <span class="similar-offers-text">Similar offers</span>
        <SimilarOffersList
          :excluded-offer-id="getOffer._id"
          :category="getOffer.category"
        />
      </Container>
    </section>
    <BaseOfferPreviewPanel
      v-if="getOffer.isPreview"
      title="This is how your offer is gonna look like"
    >
      <BaseButton class="add-btn" @click.native="addPreviewOffer">
        Add offer
      </BaseButton>
      <BaseClearButton @click.native="goBackToForm">
        Back to form
      </BaseClearButton>
    </BaseOfferPreviewPanel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseGoBackButton from '@/components/Base/Buttons/BaseGoBackButton'
import SimilarOffersList from '@/components/Base/Offer/SimilarOffersList'
import HeroContentContainer from '@/components/Base/UIContainers/HeroContentContainer'
import Map from '@/components/Map'
import BaseOfferPreviewPanel from '@/components/Base/Offer/BaseOfferPreviewPanel'
import BaseOfferSummary from '@/components/Base/Offer/BaseOfferSummary'
import TheNavbar from '@/components/TheNavbar'
import {
  CheckCircleIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon
} from 'vue-feather-icons'

export default {
  name: 'OfferDetails',
  components: {
    Map,
    BaseGoBackButton,
    SimilarOffersList,
    HeroContentContainer,
    BaseOfferPreviewPanel,
    TheNavbar,
    BaseOfferSummary,
    CheckCircleIcon,
    MapPinIcon,
    BriefcaseIcon,
    ClockIcon
  },
  props: {
    offerId: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      scroll: 0
    }
  },
  methods: {
    ...mapActions(['fetchOffer', 'editOffer', 'removeOffer']),
    addPreviewOffer() {
      this.getOffer.isPreview = false
      localStorage.removeItem('offer')
      this.editOffer(this.getOffer)
    },
    goBackToForm() {
      this.removeOffer(this.getOffer._id)
      const offer = JSON.parse(localStorage.getItem('offer'))
      offer.isPreview = false
      localStorage.setItem('offer', JSON.stringify(offer))
      this.$router.push('offer/post')
    },
    handleScroll() {
      this.scroll = window.scrollY
    }
  },
  computed: {
    ...mapGetters(['getOffer', 'getIsLoading']),
    salaryRange() {
      return `${this.getOffer.salary.salaryMin} - ${this.getOffer.salary.salaryMax} ${this.getOffer.salary.currency}`
    },
    displayOfferSummary() {
      return this.scroll >= 300
    }
  },
  watch: {
    offerId: function() {
      this.fetchOffer(this.offerId)
    }
  },
  created() {
    this.fetchOffer(this.offerId)
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: -40px !important;
  padding-bottom: 0 !important;
}

.offer-details-section {
  margin-bottom: $margin-md;
  font-size: $font-content-lg;
  color: $dark-blue;
}
.offer {
  span {
    margin-right: 15px;
  }
  &__header {
    margin-bottom: $margin-sm;
  }
  &__tag {
    @include tag;
    @include tag-light;
    margin-bottom: 0.5rem;
    margin-right: 10px;
  }
  &__icon {
    font-size: $font-content-lg;
    margin-right: 10px;
    &--green {
      color: $success;
    }
  }
  &__category {
    @include tag-light;
  }
  &__go-back-btn {
    margin-bottom: $margin-md;
  }
  &__map {
    margin-top: $margin-md;
    width: 100%;
  }
}
.offer-tag-container {
  @include flex(null, center);
  flex-wrap: wrap;
}
.btn-container {
  .btn {
    margin-right: 20px;
  }
}
.similar-offers-text {
  @include input-name;
  display: block;
  margin-bottom: $margin-md;
}
.add-btn {
  margin-right: 1rem;
}
</style>
