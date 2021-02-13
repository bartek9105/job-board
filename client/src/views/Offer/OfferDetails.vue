<template>
  <div class="offer">
    <BaseHero>
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
          <span>
            <font-awesome-icon icon="map-marker-alt" />
            {{ getOffer.location.city }}
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
        <template v-else v-slot:details>
          <BaseSpinner />
        </template>
      </HeroContentContainer>
    </BaseHero>
    <main>
      <ContentContainer>
        <div class="offer-details-container">
          <div v-if="!getIsLoading" class="offer-details-offer-info">
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
          <BaseSpinner v-else />
          <div v-if="!getIsLoading" class="offer-details-company-info">
            <BaseCompany
              v-if="Object.entries(getOffer).length > 0"
              :company="getOffer.creator"
            />
          </div>
          <BaseSpinner v-else />
        </div>
      </ContentContainer>
    </main>
    <section>
      <Container>
        <SimilarOffersList :category="getOffer.category" />
      </Container>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseCompany from '@/components/Base/Company/BaseCompanyInfo'
import OfferApplyForm from '@/components/Forms/Offer/OfferApplyForm'
import BaseGoBackButton from '@/components/Base/Buttons/BaseGoBackButton'
import SimilarOffersList from '@/components/Base/Offer/SimilarOffersList'
import HeroContentContainer from '@/components/Base/UIContainers/HeroContentContainer'

export default {
  name: 'OfferDetails',
  components: {
    BaseCompany,
    BaseGoBackButton,
    OfferApplyForm,
    SimilarOffersList,
    HeroContentContainer
  },
  props: {
    offerId: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    ...mapActions(['fetchOffer'])
  },
  computed: {
    ...mapGetters(['getOffer', 'getIsLoading'])
  },
  watch: {
    offerId: function() {
      this.fetchOffer(this.offerId)
    }
  },
  created() {
    this.fetchOffer(this.offerId)
  }
}
</script>

<style lang="scss" scoped>
.offer-details-container {
  @include flex(space-between);
  .offer-details-container-row {
    @include flex();
  }
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
</style>
