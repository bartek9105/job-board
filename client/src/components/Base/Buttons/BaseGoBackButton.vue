<template>
  <button class="go-back-btn">
    <arrow-left-icon size="1.25x" class="go-back-btn__icon" />
    <span class="go-back-btn__text">Go Back</span>
  </button>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons'

export default {
  name: 'BaseGoBackButton',
  components: {
    ArrowLeftIcon
  }
}
</script>

<style lang="scss" scoped>
.go-back-btn {
  @include flex(null, center);
  background-color: $white-blue;
  color: $dark-blue;
  padding: 0.4rem $padding-sm;
  border-radius: $border-radius-btn;
  font-weight: $font-regular-bold;
  &__icon {
    margin-right: 1rem;
  }
  &:hover {
    color: $white;
    background-color: $dark-blue;
  }
}
</style>
