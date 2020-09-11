<template>
  <button class="themeBtn">
    <slot></slot>
  </button>
</template>

<style lang="scss">
  .themeBtn {
    background-color: $theme-pink;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 136px;
    padding: 10px 20px;
    cursor: pointer;
    box-shadow: 0 1px 6px #000;
    &:hover {
      @include hover-transition;
      background-color: $theme-pink-hover;
    }
  }
</style>
