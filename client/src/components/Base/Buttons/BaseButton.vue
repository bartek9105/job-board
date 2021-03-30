<template>
  <button type="submit" class="btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>

<style lang="scss" scoped>
.btn {
  @include shadow;
  background-color: $pink;
  color: $white;
  border-radius: $border-radius-btn;
  padding: 10px 20px;
  width: fit-content;
  &:hover {
    @include shadow-hover;
    background-color: $pink-hover;
  }
}
</style>
