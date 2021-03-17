<template>
  <div>
    <label for="">{{ label }}</label>
    <select v-model="value" :name="name" @change="valueChange">
      <option
        v-for="(value, index) in optionValues"
        :key="index"
        :value="value"
      >
        <span v-if="value.name">{{ value.name }}</span>
        <span v-else>{{ value }}</span>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    optionValues: Array,
    name: String,
    label: String
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
