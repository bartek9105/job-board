<template>
  <div class="hero">
    <slot name="nav"></slot>
    <slot name="search"></slot>
  </div>
</template>

<style lang="scss">
  .hero {
    background-image: url(../assets/bg.jpg);
    width: 100%;
    height: 470px;
    background-size: cover;
  }
</style>
