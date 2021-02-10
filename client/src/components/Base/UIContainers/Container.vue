<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Container'
}
</script>

<style lang="scss" scoped>
.container {
  max-width: $container-width;
  margin: $margin-center;
  padding: $padding-lg 0;
}
</style>
