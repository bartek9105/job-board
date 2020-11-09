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
    cursor: pointer;
    margin-left: 20px;
    background: transparent;
    font-weight: 700;
    border: none;
    color: $theme-dark-blue;
  }
</style>
