<template>
  <div class="tag">
    {{ tagName }}
    <x-icon
      size="1.25x"
      class="tag__delete-icon"
      @click="deleteTag(tagIndex)"
    />
  </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'

export default {
  name: 'BaseTag',
  components: {
    XIcon
  },
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
