<template>
  <Container>
    <h1>Page not found</h1>
    <BaseGoBackButton />
  </Container>
</template>

<script>
import BaseGoBackButton from '@/components/Base/Buttons/BaseGoBackButton'

export default {
  name: 'NotFound',
  components: {
    BaseGoBackButton
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: $margin-md;
}
</style>
