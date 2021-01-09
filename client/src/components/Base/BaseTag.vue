<template>
  <div class="tag">
    {{ tagName }}
    <font-awesome-icon
      icon="times-circle"
      class="tag__delete-icon"
      @click="deleteTag(tagIndex)"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseTag',
  props: {
    tagName: String,
    tagIndex: Number
  },
  methods: {
    deleteTag(index) {
      this.$emit('deletedItem', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  @include tag;
  @include tag-dark;
  display: inline-block;
  margin-right: 5px;
  margin-bottom: $margin-xsm;
  &__delete-icon {
    margin-left: 3px;
    cursor: pointer;
  }
}
</style>
