<template>
  <div class="no-results">
    <img
      src="@/assets/images/notfound.svg"
      alt="Not found"
      class="no-results__img"
    />
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
  margin: 3rem 0;
  &__img {
    max-width: 400px;
  }
  &__text {
    font-size: 1.3rem;
    color: $dark-blue-light;
    margin-top: $margin-lg;
  }
}
</style>
