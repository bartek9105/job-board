<template>
  <div
    v-if="Object.entries(getOffer).length > 0"
    class="map-offer"
    :style="{ borderTop }"
  >
    <BaseGoBackButton @click.native="closeOffer" />
    <div v-if="getIsLoading">
      <BaseSpinner />
    </div>
    <div v-else>
      <section class="map-offer__main">
        <BaseCompanyLogo
          :avatar-url="getOffer.creator.avatarUrl"
          :img-width="100"
          :img-height="100"
        />
        <div class="map-offer__details">
          <h1>
            {{ getOffer.title }}
          </h1>
          <div>
            <span class="map-offer__detail-tag">{{
              getOffer.category.name
            }}</span>
            <span class="map-offer__detail-tag">{{ getOffer.seniority }}</span>
            <span class="map-offer__detail-tag">{{ getOffer.contract }}</span>
            <span class="map-offer__detail-tag">{{ getOffer.type }}</span>
            <span>{{ salaryRange }}</span>
          </div>
        </div>
      </section>
      <main>
        <section>
          <h2 class="map-offer__heading">
            Job description
          </h2>
          <p class="map-offer__description" v-html="getOffer.description" />
        </section>
        <section>
          <h2 class="map-offer__heading">
            Technologies
          </h2>
          <div
            v-for="(technology, index) in getOffer.technologies"
            :key="index"
            class="map-offer__technology"
          >
            {{ technology.name }}
          </div>
        </section>
        <section>
          <h2 class="map-offer__heading">
            Benefits
          </h2>
          <ul>
            <li v-for="(benefit, index) in getOffer.benefits" :key="index">
              <check-circle-icon size="1.5x" class="map-offer__check-icon" />
              {{ benefit.name }}
            </li>
          </ul>
        </section>
        <section>
          <BaseButton>Apply</BaseButton>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseGoBackButton from '@/components/Base/Buttons/BaseGoBackButton.vue'
import BaseCompanyLogo from '@/components/Base/Company/BaseCompanyLogo.vue'
import { CheckCircleIcon } from 'vue-feather-icons'

export default {
  name: 'BaseMapOffer',
  components: {
    BaseGoBackButton,
    BaseCompanyLogo,
    CheckCircleIcon
  },
  props: {
    offerId: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['getOffer', 'getIsLoading']),
    salaryRange() {
      return `${this.getOffer.salary.salaryMin} - ${this.getOffer.salary.salaryMax} ${this.getOffer.salary.currency}`
    },
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
    }
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
  section {
    border-bottom: 1px solid $light-blue;
    padding: $padding-md 0;
  }
  &__heading {
    margin-bottom: $margin-md;
  }
  &__main {
    @include flex();
  }
  &__details {
    @include flex(space-between, null, column);
    padding: $padding-sm 0;
  }
  &__detail-tag {
    @include tag-light;
    font-weight: $font-bold;
    margin-right: 0.5rem;
  }
  &__description {
    margin-bottom: $margin-md;
  }
  &__technology {
    @include tag-light;
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
    font-weight: $font-bold;
  }
  &__check-icon {
    color: $success;
    margin-right: 1rem;
  }
}
</style>
