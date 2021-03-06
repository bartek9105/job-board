<template>
  <div
    v-if="Object.entries(getOffer).length > 0"
    class="map-offer"
    :style="{ borderTop }"
  >
    <BaseGoBackButton @click.native="closeOffer" />
    <BaseSpinner v-if="getIsLoading" />
    <div v-else>
      <header class="map-offer__header">
        <BaseCompanyLogo
          :avatar-url="getOffer.creator.avatarUrl"
          :img-width="100"
          :img-height="100"
          class="map-offer__logo"
        />
        <div class="map-offer__summary">
          <h1 class="map-offer__title">
            {{ getOffer.title }}
          </h1>
          <div>
            <span class="map-offer__detail-tag">
              {{ getOffer.category.name }}
            </span>
            <span class="map-offer__detail-tag">{{ getOffer.seniority }}</span>
            <span class="map-offer__detail-tag">{{ getOffer.contract }}</span>
            <span class="map-offer__detail-tag">{{ getOffer.type }}</span>
            <span class="map-offer__detail-tag">{{
              salaryRange(getOffer.salary)
            }}</span>
          </div>
        </div>
      </header>
      <main>
        <section>
          <article>
            <h3 class="map-offer__section-header">
              Job description
            </h3>
            <p class="map-offer__description" v-html="getOffer.description" />
          </article>
        </section>
        <section>
          <h3 class="map-offer__section-header">
            Technologies
          </h3>
          <BaseTagsList :tags="getOffer.technologies" />
        </section>
        <section>
          <h3 class="map-offer__section-header">
            Benefits
          </h3>
          <BaseBenefitsList :benefits="getOffer.benefits" />
        </section>
        <BaseButton>Apply</BaseButton>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import salaryRange from '@/utils/salaryRange'
import BaseGoBackButton from '@/components/Base/Buttons/BaseGoBackButton.vue'
import BaseCompanyLogo from '@/components/Base/Company/BaseCompanyLogo.vue'
import BaseTagsList from '@/components/Base/BaseTagsList.vue'
import BaseBenefitsList from '@/components/Base/BaseBenefitsList.vue'

export default {
  name: 'BaseMapOffer',
  components: {
    BaseGoBackButton,
    BaseCompanyLogo,
    BaseTagsList,
    BaseBenefitsList
  },
  props: {
    offerId: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    ...mapGetters(['getOffer', 'getIsLoading']),
    borderTop() {
      return `4px solid ${this.getOffer.category.color}`
    }
  },
  created() {
    this.fetchOffer(this.offerId)
  },
  methods: {
    ...mapActions(['fetchOffer']),
    closeOffer() {
      this.$emit('close', false)
    },
    salaryRange
  }
}
</script>

<style lang="scss" scoped>
.map-offer {
  background-color: $white;
  height: 650px;
  overflow-y: scroll;
  color: $dark-blue;
  font-size: $font-content-lg;
  line-height: $line-height-regular;
  padding: $padding-md;
  border-radius: $border-radius-sm;
  section {
    padding: $padding-md 0;
    &:not(:last-of-type) {
      border-bottom: 1px solid $light-blue;
    }
  }
  &__section-header {
    margin-bottom: $margin-sm;
  }
  &__header {
    @include flex();
    border-bottom: 1px solid $light-blue;
    padding-bottom: $padding-sm;
  }
  &__logo {
    margin-right: 1rem;
  }
  &__title {
    margin-bottom: 1rem;
  }
  &__summary {
    @include flex(space-between, null, column);
    padding: $padding-sm 0;
  }
  &__detail-tag {
    @include tag-light;
    font-weight: $font-bold;
    margin-right: 0.5rem;
  }
}
</style>
