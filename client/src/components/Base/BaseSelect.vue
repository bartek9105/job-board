<template>
  <div class="select">
    <label for="">{{ label }}</label>
    <select
      :value="selected"
      :name="name"
      @change="$emit('input', $event.target.value)"
    >
      <option
        v-for="(value, index) in optionValues"
        :key="index"
        :value="value"
      >
        <span>{{ value }}</span>
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
    label: String,
    selected: String
  }
}
</script>

<style lang="scss" scoped>
.select {
  @include flex(null, null, column);
}
</style>
