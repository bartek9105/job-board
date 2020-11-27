<template>
  <button class="themeBtn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  .themeBtn {
    @include shadow;
    background-color: $theme-pink;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 136px;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      @include shadow-hover;
    }
  }
</style>
