<template>
  <div class="summary">
    <div class="summary__left">
      <h2>{{ offer.title }}</h2>
      <div class="summary__details">
        <span>
          <font-awesome-icon
            icon="map-marker-alt"
            class="summary__details__icon"
          />
          {{ offer.location.city }}
        </span>
        <span>
          <font-awesome-icon
            icon="money-bill-wave"
            class="summary__details__icon"
          />
          {{ offer.salary.salaryMin }} - {{ offer.salary.salaryMax }}
        </span>
      </div>
    </div>
    <BaseButton>Apply</BaseButton>
  </div>
</template>

<script>
export default {
  name: 'BaseOfferSummary',
  props: {
    offer: Object
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
    font-size: $font-content-md;
    color: $dark-blue;
    margin-left: 1.5rem;
    &__icon {
      margin: 0 0.5rem;
    }
  }
}
</style>
