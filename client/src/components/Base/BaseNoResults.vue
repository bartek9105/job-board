<template>
  <div class="no-results">
    <font-awesome-icon icon="search" class="no-results__search-icon" />
    <span class="no-results__text">
      <slot />
    </span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.no-results {
  @include flex(center, center, column);
  &__search-icon {
    font-size: 2rem;
    color: $dark-blue-light;
    margin-bottom: $margin-md;
  }
  &__text {
    font-size: 1.3rem;
    color: $dark-blue-light;
  }
}
</style>
