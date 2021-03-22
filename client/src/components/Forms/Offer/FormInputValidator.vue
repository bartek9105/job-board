<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="rules"
    class="input"
    tag="div"
  >
    <label for="">{{ placeholder }}</label>
    <input
      :value="value"
      type="text"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <span class="error">{{ errors[0] }}</span>
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
    value: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  @include flex(null, null, column);
}
</style>
