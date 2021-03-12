<template>
  <div @click.self="showMoreFilters = false">
    <div class="job-search">
      <form class="job-search__job-form" @submit.prevent>
        <input
          v-model="query.title"
          type="text"
          class="job-search__job-form__input job-search__job-form__input--title"
          placeholder="Title or keyword"
        />
        <search-icon
          size="1.25x"
          class="job-search__job-form__icon job-search__job-form__icon--title"
        />
        <input
          v-model="query.location"
          type="text"
          class="job-search__job-form__input job-search__job-form__input--location"
          placeholder="Location"
        />
        <map-pin-icon
          size="1.25x"
          class="job-search__job-form__icon job-search__job-form__icon--location"
        />
        <button type="button" @click="showMoreFilters = !showMoreFilters">
          <filter-icon size="1.25x" />
        </button>
        <button class="job-search__btn" @click="emitQuery">
          <search-icon size="1.5x" class="job-search__job-form__icon--btn" />
        </button>
      </form>
    </div>
    <JobSearchForm
      v-if="showMoreFilters"
      button-text="Search"
      button-text-clear="Clear filters"
    />
  </div>
</template>

<script>
import JobSearchForm from '@/components/Forms/JobSearchForm.vue'
import { SearchIcon, MapPinIcon, FilterIcon } from 'vue-feather-icons'

export default {
  components: {
    JobSearchForm,
    SearchIcon,
    MapPinIcon,
    FilterIcon
  },
  data() {
    return {
      showMoreFilters: false,
      query: {
        title: '',
        location: ''
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutsideFilterHandler)
  },
  methods: {
    emitQuery() {
      this.$emit('searchQuery', this.query)
    },
    clickOutsideFilterHandler(evt) {
      if (!this.$el.contains(evt.target)) {
        this.showMoreFilters = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search {
  max-width: $container-width;
  margin: $margin-center;
  color: $white-blue;
  text-align: center;
  &__btn {
    background-color: $pink;
    border-radius: 0 8px 8px 0;
  }
  &__job-form {
    @include shadow;
    border-radius: 0.5rem 0 0 0.5rem;
    margin-top: 65px;
    width: 100%;
    display: grid;
    grid-template-columns: (65% 20% auto auto);
    position: relative;
    z-index: 3;
    &__input {
      border: 0 !important;
      height: 65px;
      padding-left: 3rem;
      &--title {
        border-right: 1px solid $dark-blue-lighter !important;
        border-radius: 0.5rem 0 0 0.5rem;
      }
    }
    &__icon {
      position: absolute;
      color: $dark-blue;
      &--title {
        top: 22px;
        left: 15px;
      }
      &--location {
        top: 22px;
        left: 720px;
      }
      &--btn {
        color: $white;
      }
    }
  }
}
</style>
