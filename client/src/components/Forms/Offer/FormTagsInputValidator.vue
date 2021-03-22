<template>
  <ValidationProvider v-slot="{ errors }" rules="arrayEmpty" tag="div">
    <TagInput
      v-model="inputTags"
      :list-items="listItems"
      :label="label"
      :is-single="isSingle"
      :selected="selected"
      @items="tags"
    />
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import TagInput from '@/components/TagInput'

export default {
  name: 'FormTagsInputValidator',
  components: {
    ValidationProvider,
    TagInput
  },
  props: {
    listItems: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: () => ''
    },
    isSingle: {
      type: Boolean,
      default: () => false
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      inputTags: this.selected
    }
  },
  methods: {
    tags(selectedItems) {
      this.inputTags = selectedItems
      this.$emit('items', selectedItems)
    }
  }
}
</script>

<style></style>
