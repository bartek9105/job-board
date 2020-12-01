<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  .btn {
    @include shadow;
    background-color: $pink;
    color: $white;
    font-size: $font-content-md;
    font-weight: $font-bold;
    border-radius: $border-radius-btn;
    padding: 10px 20px;
    &:hover {
      @include shadow-hover;
    }
  }
</style>
