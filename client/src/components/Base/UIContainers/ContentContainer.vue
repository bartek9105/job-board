<template>
  <Container>
    <div class="content-container">
      <slot />
    </div>
  </Container>
</template>

<script>
export default {
  name: 'ContentContainer'
}
</script>

<style lang="scss" scoped>
.content-container {
  @include shadow;
  background: $white;
  padding: $padding-md 2rem;
  position: relative;
  top: -30px;
  font-size: $font-content-md;
  line-height: $line-height-regular;
  border-radius: $border-radius-sm;
  h3 {
    margin-bottom: $margin-sm;
  }
}
</style>
