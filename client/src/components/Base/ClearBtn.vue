<template>
  <button class="clear-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ClearBtn'
}
</script>

<style lang="scss">
.clear-btn {
  background: transparent;
  color: $dark-blue;
  font-weight: $font-bold;
}
</style>
