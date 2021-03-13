<template>
  <router-link to="/">
    <div class="logo">
      <code-icon size="2x" class="logo__icon" />
      <span class="logo__text" :class="{ darkBlue: isDarkBlue }">
        <span class="logo__text logo__text--theme">Code</span>Job
      </span>
    </div>
  </router-link>
</template>

<script>
import { CodeIcon } from 'vue-feather-icons'

export default {
  name: 'BaseLogo',
  components: {
    CodeIcon
  },
  props: {
    isDarkBlue: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  @include flex(null, center);
  &__text {
    font-family: 'Rubik', sans-serif;
    color: $white;
    font-weight: $font-bold;
    margin-right: 0.5rem;
    font-size: 26px;
    letter-spacing: 3px;
    margin: 0;
    &--theme {
      color: $pink;
    }
  }
  &__icon {
    color: $pink;
    background-color: $white;
    border-radius: 50%;
    padding: 0.25rem;
    margin-right: 1rem;
  }
}
.darkBlue {
  color: $dark-blue;
}
</style>
