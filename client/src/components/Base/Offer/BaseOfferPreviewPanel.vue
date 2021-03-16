<template>
  <div class="offer-preview-panel">
    <div class="offer-preview-panel__details">
      <h3 class="offer-preview-panel__header">
        {{ title }}
      </h3>
      <div class="buttons">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseOfferPreviewPanel',
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style lang="scss" scoped>
.offer-preview-panel {
  @include shadow-bold;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: $white;
  padding: $padding-md 0;
  width: 100%;
  z-index: 1;
  &__details {
    @include flex(space-between, center);
    max-width: $container-width;
    margin: $margin-center;
  }
}
</style>
