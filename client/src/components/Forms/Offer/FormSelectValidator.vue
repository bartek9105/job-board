<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules" tag="div">
    <BaseSelect
      v-model="value"
      :option-values="optionValues"
      :name="name"
      :label="label"
      @value-change="emitSelectedValue"
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
    rules: String
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    emitSelectedValue(value, name) {
      this.value = value
      this.$emit('selectedValue', value, name)
    }
  }
}
</script>
