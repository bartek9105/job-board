<template>
  <div class="benefits-list">
    <ul>
      <li
        v-for="(benefit, index) in benefits"
        :key="index"
        class="benefits-list__item"
      >
        <check-circle-icon size="1.5x" class="benefits-list__check-icon" />
        {{ benefit.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { CheckCircleIcon } from 'vue-feather-icons'

export default {
  name: 'BaseBenefitsList',
  components: {
    CheckCircleIcon
  },
  props: {
    benefits: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.benefits-list {
  &__item {
    @include flex(null, center);
    margin-bottom: 0.5rem;
  }
  &__check-icon {
    color: $success;
    margin-right: 1rem;
  }
}
</style>
