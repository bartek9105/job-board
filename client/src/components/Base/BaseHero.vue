<template>
  <header class="hero" :style="{ height: heroHeight + 'px' }">
    <div class="shape-1" />
    <div class="shape-2" />
    <div class="shape-3" />
    <slot />
  </header>
</template>

<script>
export default {
  name: 'BaseHero',
  props: {
    heroHeight: String
  }
}
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  position: relative;
  background: rgb(24, 41, 82);
  background: linear-gradient(
    297deg,
    rgba(24, 41, 82, 1) 0%,
    rgba(24, 41, 82, 1) 40%,
    rgba(30, 62, 127, 1) 100%
  );
  .shape-1,
  .shape-2,
  .shape-3 {
    position: absolute;
    background-color: $light-blue;
    transition: all 1s ease-in-out;
    border-radius: 10% 40% 10% 70% / 10% 30% 70% 70%;
  }
  .shape-1 {
    top: -40px;
    right: 0px;
    opacity: 0.05;
    animation: morph-3 2s ease-in-out 1;
    height: 140px;
    width: 800px;
  }
  .shape-2 {
    bottom: -50px;
    left: -50px;
    opacity: 0.06;
    animation: morph-2 2s ease-in-out 1;
    height: 110px;
    width: 500px;
    transform: rotate(5deg);
  }
  .shape-3 {
    bottom: -80px;
    left: -120px;
    opacity: 0.04;
    animation: morph-2 2s ease-in-out 1;
    height: 110px;
    width: 500px;
    transform: rotate(30deg);
  }
}
@keyframes morph-1 {
  0% {
    border-radius: 20% 40% 30% 50% / 10% 30% 70% 40%;
  }

  100% {
    border-radius: 20% 40% 10% 70% / 10% 30% 70% 70%;
  }
}

@keyframes morph-2 {
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
  100% {
    border-radius: 10% 40% 10% 70% / 10% 30% 70% 70%;
  }
}

@keyframes morph-3 {
  0% {
    border-radius: 20% 60% 50% 40% / 10% 30% 70% 70%;
  }

  100% {
    border-radius: 10% 40% 10% 70% / 10% 30% 70% 70%;
  }
}
</style>
