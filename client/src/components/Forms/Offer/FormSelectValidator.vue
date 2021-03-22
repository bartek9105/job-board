<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" tag="div">
    <BaseSelect
      v-model="value"
      :option-values="optionValues"
      :name="name"
      :label="label"
      :selected="selected"
    />
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import BaseSelect from '@/components/Base/BaseSelect'

export default {
  name: 'FormSelectValidator',
  components: {
    BaseSelect,
    ValidationProvider
  },
  props: {
    optionValues: {
      type: Array,
      default: () => []
    },
    name: String,
    label: String,
    rules: String,
    selected: String
  },
  data() {
    return {
      value: this.selected
    }
  },
  watch: {
    value: function() {
      this.$emit('valueChange', this.value, this.name)
    }
  }
}
</script>
