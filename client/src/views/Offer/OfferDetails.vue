<template>
  <div v-if="Object.entries(offer).length > 0" class="offer">
    <BaseOfferSummary v-if="displayOfferSummary" :offer="offer" />
    <BaseHero hero-height="250">
      <TheNavbar />
      <HeroContentContainer>
        <template v-slot:logo>
          <BaseCompanyLogo
            v-if="Object.entries(offer).length > 0"
            :avatar-url="offer.creator.avatarUrl"
            :img-width="100"
            :img-height="100"
          />
        </template>
        <template v-if="!getIsLoading" v-slot:details>
          <div>
            <h1>
              {{ offer.title }}
            </h1>
          </div>
          <div>
            <span>
              <map-pin-icon size="1.25x" />
              {{ offer.location.city }}
            </span>
            <span v-if="offer.isRemote">
              Remote
            </span>
          </div>
          <div>
            <span>
              <briefcase-icon size="1.25x" />
              {{ offer.contract }}
            </span>
            <span>
              <clock-icon size="1.25x" />
              {{ offer.type }}
            </span>
            <span class="offer__category">{{ offer.category }}</span>
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
              <div class="offer__top">
                <router-link to="/">
                  <BaseGoBackButton />
                </router-link>
                <SocialShare url="vuejs.org" :title="offer.title" />
              </div>
              <h3 class="offer__header">
                Job Description
              </h3>
              <p v-html="offer.description" />
            </section>
            <section class="offer-details-section">
              <h3 class="offer__header">
                Technologies
              </h3>
              <BaseTagsList :tags="offer.technologies" />
            </section>
            <section class="offer-details-section">
              <h3 class="offer__header">
                Benefits
              </h3>
              <BaseBenefitsList :benefits="offer.benefits" />
            </section>
            <div class="btn-container">
              <BaseButton class="btn">
                <a :href="offer.applyURL" target="_blank">Apply</a>
              </BaseButton>
            </div>
            <section>
              <Map
                v-if="Object.entries(offer).length > 0"
                class="offer__map"
                :offer="offer"
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
          :excluded-offer-id="offer._id"
          :category="offer.category"
        />
      </Container>
    </section>
    <BaseOfferPreviewPanel
      v-if="isPreviewMode"
      title="You see this offer in preview mode"
    >
      <template #icon>
        <eye-icon size="1.5x" class="custom-class" />
      </template>
      <template #buttons>
        <BaseButton class="add-btn" @click.native="acceptOffer">
          Add offer
        </BaseButton>
        <BaseClearButton @click.native="goBackToForm">
          Back to form
        </BaseClearButton>
      </template>
    </BaseOfferPreviewPanel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseGoBackButton from '@/components/Base/Buttons/BaseGoBackButton'
import SimilarOffersList from '@/components/Base/Offer/SimilarOffersList'
import HeroContentContainer from '@/components/Base/UIContainers/HeroContentContainer'
import BaseOfferPreviewPanel from '@/components/Base/Offer/BaseOfferPreviewPanel'
import Map from '@/components/Map'
import BaseOfferSummary from '@/components/Base/Offer/BaseOfferSummary'
import TheNavbar from '@/components/TheNavbar'
import BaseTagsList from '@/components/Base/BaseTagsList'
import BaseBenefitsList from '@/components/Base/BaseBenefitsList'
import SocialShare from '@/components/SocialShare'
import {
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  EyeIcon
} from 'vue-feather-icons'

export default {
  name: 'OfferDetails',
  components: {
    SocialShare,
    Map,
    BaseGoBackButton,
    SimilarOffersList,
    HeroContentContainer,
    BaseOfferPreviewPanel,
    TheNavbar,
    BaseOfferSummary,
    BaseTagsList,
    BaseBenefitsList,
    MapPinIcon,
    BriefcaseIcon,
    ClockIcon,
    EyeIcon
  },
  props: {
    isPreviewMode: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      scroll: 0
    }
  },
  methods: {
    ...mapActions(['fetchOffer', 'addFreeOffer']),
    acceptOffer() {
      localStorage.removeItem('offer')
      const { _id, ...rest } = this.offer
      this.addFreeOffer(rest)
      this.$router.push('/')
    },
    goBackToForm() {
      this.$router.replace({ name: 'OfferPost' })
    },
    handleScroll() {
      this.scroll = window.scrollY
    }
  },
  computed: {
    ...mapGetters(['offer', 'getIsLoading']),
    salaryRange() {
      return `${this.offer.salary.salaryMin} - ${this.offer.salary.salaryMax} ${this.offer.salary.currency}`
    },
    displayOfferSummary() {
      return this.scroll >= 300
    }
  },
  watch: {
    offerId: function() {
      this.fetchOffer(this.$route.params.slug)
    }
  },
  created() {
    if (!this.isPreviewMode) {
      this.fetchOffer(this.$route.params.slug)
    }
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
  &__map {
    margin-top: $margin-md;
    width: 100%;
  }
  &__top {
    @include flex(space-between, center);
    margin-bottom: $margin-md;
  }
}
.offer-tag-container {
  @include flex(null, center);
  flex-wrap: wrap;
}
.btn-container {
  .btn {
    margin-right: 20px;
    a {
      color: $white;
    }
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
