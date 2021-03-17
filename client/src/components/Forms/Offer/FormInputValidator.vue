<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <label for="">{{ placeholder }}</label>
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <span>{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormInput',
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: String,
      default: () => ''
    },
    placeholder: {
      type: String,
      default: () => ''
    },
    value: String
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>
