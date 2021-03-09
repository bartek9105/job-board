<template>
  <button class="go-back-btn">
    <font-awesome-icon icon="arrow-left" class="go-back-btn__icon" />
    <span class="go-back-btn__text">Go Back</span>
  </button>
</template>

<script>
export default {
  name: 'BaseGoBackButton'
}
</script>

<style lang="scss" scoped>
.go-back-btn {
  background-color: $white-blue;
  color: $dark-blue;
  padding: $padding-xsm $padding-sm;
  border-radius: $border-radius-btn;
  font-weight: $font-regular-bold;
  &__icon {
    margin-right: 1rem;
  }
}
</style>
