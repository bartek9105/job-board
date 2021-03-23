<template>
  <div class="offer-preview-panel">
    <div class="offer-preview-panel__details">
      <div class="offer-preview-panel__header">
        <slot name="icon" />
        <h3>
          {{ title }}
        </h3>
      </div>
      <div class="buttons">
        <slot name="buttons" />
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
  background-color: rgba(0, 0, 0, 0.6);
  padding: $padding-sm 0;
  width: 100%;
  z-index: 1;
  &__header {
    @include flex(null, center);
    color: $white;
  }
  h3 {
    color: $white;
    margin-left: 1rem;
  }
  &__details {
    @include flex(space-between, center);
    max-width: $container-width;
    margin: $margin-center;
  }
}
</style>
