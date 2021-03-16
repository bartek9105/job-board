<template>
  <div class="summary">
    <div class="summary__left">
      <h2>{{ offer.title }}</h2>
      <div class="summary__details">
        <div class="summary__location">
          <map-pin-icon size="1.25x" class="summary__marker-icon" />
          {{ offer.location.city }}
        </div>
        <span>
          {{ salaryRange(offer.salary) }}
        </span>
      </div>
    </div>
    <BaseButton class="summary__btn">
      <a :href="offer.applyURL" target="_blank">Apply</a>
    </BaseButton>
  </div>
</template>

<script>
import { MapPinIcon } from 'vue-feather-icons'
import salaryRange from '@/utils/salaryRange'

export default {
  name: 'BaseOfferSummary',
  components: {
    MapPinIcon
  },
  props: {
    offer: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    salaryRange
  }
}
</script>

<style lang="scss" scoped>
.summary {
  @include flex(space-between, center);
  @include shadow-hover;
  background-color: $white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  padding: $padding-sm $padding-md;
  &__left {
    @include flex(null, center);
  }
  &__details {
    @include flex(null, center);
    font-size: $font-content-md;
    color: $dark-blue;
    margin-left: 1.5rem;
  }
  &__location {
    @include flex(null, center);
    margin-right: 1rem;
  }
  &__marker-icon {
    margin: 0 0.5rem;
  }
  &__btn {
    a {
      color: $white;
    }
  }
}
</style>
