<template>
  <img alt="logo" class="company-logo" :style="imgSize" />
</template>

<script>
export default {
  name: 'BaseCompanyLogo',
  props: {
    imgWidth: Number
  },
  computed: {
    imgSize() {
      return `width: ${this.imgWidth}px; height: ${this.imgWidth}px`
    }
  }
}
</script>

<style>
.company-logo {
  border-radius: 100%;
}
</style>
