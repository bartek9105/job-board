<template>
  <div class="job-search-filters">
    <div class="job-search-filters-top">
      <h3>Filter offers</h3>
      <font-awesome-icon
        icon="times"
        class="close-icon"
        @click="closeMobileFilters"
      />
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

export default {
  name: 'JobSearchFiltersMobile',
  components: {
    JobSearchForm
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
  width: 100vw;
  height: 100vh;
  background-color: $white;
  padding: $padding-md;
}
.job-search-filters-top {
  @include flex(space-between, center);
}
.job-search-form-container {
  margin-top: $margin-lg;
}
.close-icon {
  cursor: pointer;
}
</style>
