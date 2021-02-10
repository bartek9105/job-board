<template>
  <div class="offer">
    <BaseHero>
      <HeroContentContainer>
        <template v-slot:logo>
          <BaseCompanyLogo
            :avatar-url="getOffer.creator.avatarUrl"
            :img-width="100"
            :img-height="100"
          />
        </template>
        <template v-slot:details>
          <h1>{{ getOffer.title }}</h1>
          <span>
            <font-awesome-icon icon="map-marker-alt" />
            {{ getOffer.location }}
          </span>
          <div>
            <span>
              <font-awesome-icon icon="money-bill-wave" />
              {{ getOffer.salaryMin }} - {{ getOffer.salaryMax }}
            </span>
            <span>
              <font-awesome-icon icon="file-signature" />
              {{ getOffer.contract }}
            </span>
            <span>
              <font-awesome-icon icon="clock" />
              {{ getOffer.type }}
            </span>
            <span>{{ getOffer.category }}</span>
          </div>
        </template>
      </HeroContentContainer>
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
    <section class="similar-offers">
      <SimilarOffers :category="getOffer.category" />
    </section>
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
import SimilarOffers from '@/components/SimilarOffers'
import HeroContentContainer from '@/components/Base/UIContainers/HeroContentContainer'

export default {
  name: 'OfferDetails',
  components: {
    BaseCompanyLogo,
    BaseCompany,
    BaseHero,
    BaseButton,
    BaseGoBackButton,
    BaseClearButton,
    OfferApplyForm,
    SimilarOffers,
    HeroContentContainer
  },
  props: {
    offerId: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  methods: {
    ...mapActions(['fetchOffer'])
  },
  computed: {
    ...mapGetters(['getOffer'])
  },
  watch: {
    offerId: function() {
      this.fetchOffer(this.offerId).then(() => {
        this.isLoading = false
      })
    }
  },
  created() {
    this.fetchOffer(this.offerId).then(() => {
      this.isLoading = false
    })
  }
}
</script>

<style lang="scss" scoped>
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
.similar-offers {
  width: 100%;
  background-color: $bg-grey;
  padding-bottom: $padding-sm;
}
</style>
