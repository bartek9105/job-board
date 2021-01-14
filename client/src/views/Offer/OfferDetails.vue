<template>
  <div class="offer">
    <BaseHero>
      <template v-slot:hero-content>
        <div class="offer-hero-container">
          <div class="offer-hero-container-inner">
            <BaseCompanyLogo :img-width="90" class="offer__logo" />
            <div class="offer-hero-details-container">
              <h1 class="offer__title">
                {{ getOffer.title }}
              </h1>
              <span class="offer__location">
                <font-awesome-icon icon="map-marker-alt" class="offer__icon" />
                {{ getOffer.location }}
              </span>
              <div class="offer-hero-details-container-row">
                <span class="offer__pay">
                  <font-awesome-icon
                    icon="money-bill-wave"
                    class="offer__icon"
                  />
                  {{ getOffer.salaryMin }} - {{ getOffer.salaryMax }}
                </span>
                <span class="offer__contract">
                  <font-awesome-icon
                    icon="file-signature"
                    class="offer__icon"
                  />
                  {{ getOffer.contract }}
                </span>
                <span class="offer__type">
                  <font-awesome-icon icon="clock" class="offer__icon" />
                  {{ getOffer.type }}
                </span>
                <span class="offer__category">{{ getOffer.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseHero>
    <main class="main-section">
      <div class="offer-details-container">
        <div class="offer-details-offer-info">
          <section class="offer-details-section">
            <div class="offer__go-back-btn">
              <BaseGoBackButton />
            </div>
            <h2 class="offer__header">
              Job Description
            </h2>
            <p v-html="getOffer.description" />
          </section>
          <section class="offer-details-section">
            <h2 class="offer__header">
              Technologies
            </h2>
            <div class="offer-tag-container">
              <div
                v-for="(technology, index) in getOffer.technologies"
                :key="index"
                class="offer__tag"
              >
                {{ technology }}
              </div>
            </div>
          </section>
          <section class="offer-details-section">
            <h2 class="offer__header">
              Benefits
            </h2>
            <ul ckass="offer__benefits__list">
              <li v-for="(benefit, index) in getOffer.benefits" :key="index">
                <font-awesome-icon
                  icon="check-circle"
                  class="offer__icon offer__icon--green"
                />
                {{ benefit }}
              </li>
            </ul>
          </section>
          <section class="offer-details-section">
            <h2 class="offer__header">
              Apply form
            </h2>
            <OfferApplyForm />
          </section>
          <div class="btn-container">
            <BaseButton class="btn">
              Apply
            </BaseButton>
            <BaseClearButton>Reset form</BaseClearButton>
          </div>
        </div>
        <div class="offer-details-company-info">
          <BaseCompany :company="getOffer.creator" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseCompanyLogo from '@/components/Base/BaseCompanyLogo'
import BaseHero from '@/components/Base/BaseHero'
import BaseCompany from '@/components/Base/BaseCompany'
import BaseButton from '@/components/Base/Buttons/BaseButton'
import BaseClearButton from '@/components/Base/Buttons/BaseClearButton'
import OfferApplyForm from '@/components/Forms/Offer/OfferApplyForm'
import BaseGoBackButton from '@/components/Base/Buttons/BaseGoBackButton'

export default {
  name: 'OfferDetails',
  components: {
    BaseCompanyLogo,
    BaseCompany,
    BaseHero,
    BaseButton,
    BaseGoBackButton,
    BaseClearButton,
    OfferApplyForm
  },
  props: {
    offerId: String
  },
  methods: {
    ...mapActions(['fetchOffer'])
  },
  computed: {
    ...mapGetters(['getOffer'])
  },
  mounted() {
    this.fetchOffer(this.offerId)
  }
}
</script>

<style lang="scss" scoped>
.offer-hero-container {
  @include flex(center, center);
  max-width: $container-width;
  margin: 0 $margin-center;
  color: $white;
  height: calc(100% - #{$nav-height});
  .offer-hero-container-inner {
    @include flex();
    .offer-hero-details-container {
      @include flex(space-between, null, column);
      font-size: $font-content-md;
      color: $white-blue;
    }
  }
}
.offer-details-container {
  @include flex(space-between);
  @include shadow;
  max-width: 1400px;
  position: relative;
  top: -30px;
  margin: 0 auto;
  background: $white;
  font-size: $font-content-md;
  line-height: $line-height-regular;
  padding: $padding-lg 40px;
  .offer-details-container-row {
    @include flex();
  }
}
.main-section {
  background: $bg-grey;
}

.offer-details-offer-info {
  width: 75%;
}

.offer-details-company-info {
  width: 25%;
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
  &__title {
    color: $white;
  }
  &__logo {
    margin-right: 50px;
  }
  &__header {
    margin-bottom: $margin-md;
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
      color: $success;
    }
  }
  &__category {
    @include tag;
    @include tag-light;
  }
  &__go-back-btn {
    margin-bottom: $margin-lg;
  }
}
.offer-tag-container {
  @include flex();
}
.btn-container {
  .btn {
    margin-right: 20px;
  }
}
</style>
