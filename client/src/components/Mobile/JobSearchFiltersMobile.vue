<template>
  <div class="job-search-filters">
    <div class="job-search-filters-top">
      <h3>Filter offers</h3>
      <x-icon size="1.5x" class="close-icon" @click="closeMobileFilters" />
    </div>
    <div class="job-search-form-container">
      <JobSearchForm
        button-text="Search"
        button-text-clear="Clear filters"
        :is-mobile="true"
      />
    </div>
  </div>
</template>

<script>
import JobSearchForm from '@/components/Forms/JobSearchForm'
import { XIcon } from 'vue-feather-icons'

export default {
  name: 'JobSearchFiltersMobile',
  components: {
    JobSearchForm,
    XIcon
  },
  methods: {
    closeMobileFilters() {
      this.$emit('openMobileFilters', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-filters {
  width: 100%;
  height: 100vh;
  background-color: $white;
  padding: $padding-sm;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.job-search-filters-top {
  @include flex(space-between, center);
  h3 {
    text-transform: uppercase;
  }
}
.job-search-form-container {
  margin-top: $margin-sm;
}
.close-icon {
  cursor: pointer;
}
</style>
