<template>
  <div class="hero-container">
    <div class="hero-container__content">
      <div class="hero-container__content__logo">
        <slot name="logo" />
      </div>
      <div class="hero-container__content__details">
        <slot name="details" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroContentContainer'
}
</script>

<style lang="scss" scoped>
.hero-container {
  @include flex(left, center);
  max-width: $container-width;
  margin: $margin-center !important;
  font-size: $font-content-md;
  color: $white-blue;
  height: calc(100% - #{$nav-height});
  &__content {
    @include flex(space-between, null);
    &__logo {
      margin-right: 2rem;
      width: 100px;
      height: 100px;
    }
    &__details {
      @include flex(space-between, null, column);
      h1 {
        color: $white;
      }
      span {
        margin-right: 0.5rem;
      }
      svg {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
