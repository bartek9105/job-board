<template>
  <div
    class="company-logo-container"
    :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
  >
    <img :src="avatarUrl" alt="logo" class="company-logo" />
  </div>
</template>

<script>
export default {
  name: 'BaseCompanyLogo',
  props: {
    avatarUrl: String,
    imgWidth: Number,
    imgHeight: Number
  }
}
</script>

<style lang="scss" scoped>
.company-logo-container {
  @include flex(center, center);
  background-color: $white;
  border-radius: 5px;
  padding: 0.4rem;
  overflow: hidden;
}
.company-logo {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
