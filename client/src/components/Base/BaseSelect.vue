<template>
  <select v-model="value" :name="name" @change="valueChange">
    <option v-for="(value, index) in optionValues" :key="index" :value="value">
      {{ value }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    optionValues: Array,
    name: String
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    valueChange() {
      this.$emit('value-change', this.value, this.name)
    }
  }
}
</script>

<style></style>
