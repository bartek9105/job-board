<template>
  <Container>
    <div class="content-container">
      <slot />
    </div>
  </Container>
</template>

<script>
import Container from '@/components/Base/UIContainers/Container'
export default {
  name: 'ContentContainer',
  components: {
    Container
  }
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
  h3 {
    margin-bottom: $margin-sm;
  }
}
</style>
