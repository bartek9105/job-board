<template>
  <button class="clear-btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseClearButton'
}
</script>

<style lang="scss">
.clear-btn {
  background: transparent;
  color: $dark-blue;
  font-weight: $font-bold;
  &:hover {
    color: $dark-blue-hover;
  }
}
</style>
