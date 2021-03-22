<template>
  <ValidationProvider v-slot="{ errors }" :rules="rules">
    <label>{{ placeholder }}</label>
    <TextEditor v-model="descriptionValue" />
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import TextEditor from '@/components/TextEditor'

export default {
  name: 'FormEditorValidator',
  components: {
    ValidationProvider,
    TextEditor
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
    description: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      descriptionValue: this.description
    }
  },
  watch: {
    descriptionValue(newVal, oldVal) {
      this.$emit('descriptionValue', newVal)
    }
  }
}
</script>
