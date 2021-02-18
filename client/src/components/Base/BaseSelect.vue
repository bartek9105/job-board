<template>
  <select v-model="value" :name="name" @change="valueChange">
    <option v-for="(value, index) in optionValues" :key="index" :value="value">
      <span v-if="value.name">{{ value.name }}</span>
      <span v-else>{{ value }}</span>
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
