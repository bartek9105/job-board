<template>
  <div class="salary-slider">
    <span class="salary-slider__title">{{ title }}</span>
    <span class="salary-slider__salary">{{ salaryMin }} - {{ salaryMax }}</span>
    <vue-slider
      v-model="value"
      :enable-cross="false"
      :min="0"
      :max="50000"
      :step="1000"
      :interval="1000"
      @change="emitValue"
    />
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'
export default {
  name: 'BaseSalaryRangeSlider',
  components: {
    VueSlider
  },
  props: {
    salaryMin: {
      type: Number,
      default: () => 0
    },
    salaryMax: {
      type: Number,
      default: () => 50000
    },
    title: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      value: [this.salaryMin, this.salaryMax]
    }
  },
  methods: {
    emitValue() {
      this.$emit('salaryRange', this.value)
    }
  }
}
</script>

<style lang="scss">
.salary-slider {
  &__title {
    @include input-name;
  }
  &__salary {
    display: block;
    margin-bottom: $margin-sm;
  }
}
.vue-slider-rail {
  background-color: $light-blue;
}
.salary-range-slider {
  padding: 0 !important;
}
.vue-slider-process,
.vue-slider-dot-handle,
.vue-slider-dot-handle::after,
.vue-slider-dot-tooltip-inner {
  background-color: $dark-blue;
}
.vue-slider-dot-tooltip-text {
  width: 40px;
  height: 40px;
}
</style>
