<template>
  <div>
    <div v-for="(tag, index) in tags" :key="index" class="tag">
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
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  @include tag-light;
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
  font-weight: $font-bold;
}
</style>
