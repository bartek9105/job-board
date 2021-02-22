<template>
  <header class="hero">
    <slot />
    <div class="hero__animatedCircle hero__circle-1" />
    <div class="hero__animatedCircle hero__circle-2" />
    <div class="hero__animatedCircle hero__circle-3" />
  </header>
</template>

<script>
export default {
  name: 'BaseHero'
}
</script>

<style lang="scss">
.hero {
  width: 100%;
  height: $hero-height;
  background: linear-gradient(164deg, #161b4b, #3440a8);
  background-size: 400% 400%;
  animation: GradientBackground 12s ease infinite;
  position: relative;
  @keyframes GradientBackground {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
  &__animatedCircle {
    background: $white;
    opacity: 0.1;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  &__circle-1 {
    animation: circle1 12s infinite linear;
  }
  &__circle-2 {
    animation: circle2 14s infinite linear;
  }
  &__circle-3 {
    animation: circle3 20s infinite linear;
  }
  @keyframes circle1 {
    0% {
      top: 30rem;
      left: 4rem;
    }
    50% {
      top: -1rem;
      left: 10rem;
    }
    100% {
      top: 30rem;
      left: 4rem;
    }
  }
  @keyframes circle2 {
    0% {
      top: 30rem;
      right: 20rem;
    }
    50% {
      top: -1rem;
      right: 30rem;
    }
    100% {
      top: 30rem;
      right: 20rem;
    }
  }
  @keyframes circle3 {
    0% {
      top: 30rem;
      right: 10rem;
    }
    50% {
      top: -5rem;
      right: 60rem;
    }
    100% {
      top: 30rem;
      right: 10rem;
    }
  }
}
</style>
