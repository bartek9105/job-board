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
  background: $light-blue;
  color: $dark-blue;
  font-weight: $font-bold;
  border-radius: $border-radius-btn;
  padding: 10px 20px;
  &:hover {
    color: $dark-blue-hover;
  }
}
</style>
