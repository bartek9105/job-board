<template>
  <div>
    <div class="job-search">
      <form class="job-search__job-form" @submit.prevent>
        <input
          v-model="query.title"
          type="text"
          class="job-search__job-form__input job-search__job-form__input--title"
          placeholder="Title or keyword"
        />
        <font-awesome-icon
          icon="search"
          class="job-search__job-form__icon job-search__job-form__icon--title"
        />
        <input
          v-model="query.location"
          type="text"
          class="job-search__job-form__input job-search__job-form__input--location"
          placeholder="Location"
        />
        <font-awesome-icon
          icon="map-marker-alt"
          class="job-search__job-form__icon job-search__job-form__icon--location"
        />
        <button @click="showMoreFilters = !showMoreFilters">
          <font-awesome-icon icon="filter" />
        </button>
        <button class="job-search__btn" @click="emitQuery">
          <font-awesome-icon
            icon="search"
            class="job-search__job-form__icon--btn"
          />
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
export default {
  components: {
    JobSearchForm
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
  methods: {
    emitQuery() {
      this.$emit('searchQuery', this.query)
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
    }
    &__icon {
      position: absolute;
      color: $dark-blue;
      &--title {
        top: 25px;
        left: 20px;
      }
      &--location {
        top: 25px;
        left: 730px;
      }
      &--btn {
        color: $white;
      }
    }
  }
}
</style>
