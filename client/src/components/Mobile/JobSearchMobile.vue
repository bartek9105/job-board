<template>
  <div class="job-search-form-mobile-container">
    <form class="job-search-form-mobile" @submit.prevent>
      <input
        type="text"
        class="job-search-form-mobile__input"
        placeholder="Title or keyword"
      />
      <filter-icon
        size="1.5x"
        class="filter-icon"
        @click="isMediumFiltersOpen = !isMediumFiltersOpen"
      />
    </form>
  </div>
</template>

<script>
import { FilterIcon } from 'vue-feather-icons'

export default {
  name: 'JobSearchMobile',
  components: {
    FilterIcon
  },
  data() {
    return {
      isMediumFiltersOpen: false
    }
  },
  watch: {
    isMediumFiltersOpen: function(newValue, oldValue) {
      this.$emit('openMobileFilters', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-form-mobile-container {
  width: 100%;
  background-color: $white;
}
.job-search-form-mobile {
  @include flex(space-between, center);
  width: 100%;
  &__input {
    width: 100%;
    margin-right: 1rem;
  }
}
.filter-icon {
  cursor: pointer;
}
</style>
