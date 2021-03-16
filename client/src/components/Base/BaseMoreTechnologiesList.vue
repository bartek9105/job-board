<template>
  <div
    class="technologies"
    @mouseover="showTechnologies = true"
    @mouseleave="showTechnologies = false"
  >
    + {{ technologies.length - 3 }}
    <ul v-if="showTechnologies" class="technologies__list">
      <li v-for="(technology, index) in technologies.slice(3)" :key="index">
        {{ technology.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseMoreTechnologiesList',
  props: {
    technologies: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showTechnologies: false
    }
  }
}
</script>

<style lang="scss" scoped>
.technologies {
  @include tag-light;
  position: relative;
  &__list {
    @include shadow;
    position: absolute;
    top: 30px;
    left: 0;
    width: 120px;
    padding: $padding-sm;
    font-size: $font-content-sm;
    color: $white;
    background: $dark-blue;
    border-radius: 0.2rem;
    z-index: 1;
    li {
      &:not(:last-of-type) {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
