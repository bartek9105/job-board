<template>
  <BaseSelect
    :option-values="optionValues"
    :name="name"
    :label="label"
    @value-change="emitSelectedValue"
  />
</template>

<script>
import BaseSelect from '@/components/Base/BaseSelect'

export default {
  name: 'FormSelectValidator',
  components: {
    BaseSelect
  },
  props: {
    optionValues: {
      type: Array,
      default: () => []
    },
    name: String,
    label: String
  },
  methods: {
    emitSelectedValue(value, name) {
      console.log(value, name)
      this.$emit('selectedValue', value, name)
    }
  }
}
</script>

<style></style>
