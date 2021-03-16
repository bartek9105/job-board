<template>
  <div class="tags-list">
    <div
      v-for="(tag, index) in tags.slice(0, limit)"
      :key="index"
      class="tags-list__tag"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTagsList',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-list {
  @include flex(null, center);
  &__tag {
    @include tag-light;
    display: inline-block;
    font-weight: $font-bold;
    margin-right: 0.5rem;
  }
}
</style>
