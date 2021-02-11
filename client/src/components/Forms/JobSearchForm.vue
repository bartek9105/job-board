<template>
  <div class="job-search-container">
    <div class="job-search">
      <form @submit.prevent>
        <div class="row">
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Location</span>
            <input
              v-model="queries.location"
              type="text"
              class="job-search__search-input"
              placeholder="City"
            />
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Category</span>
            <BaseSelect
              :option-values="offerDetails.CATEGORIES"
              name="category"
              class="job-search__search-input"
              @value-change="getValue"
            />
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Seniority</span>
            <BaseSelect
              :option-values="offerDetails.SENIORITIES"
              name="seniority"
              class="job-search__search-input"
              @value-change="getValue"
            />
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Salary</span>
            <div class="job-search__salary-inputs">
              <input
                v-model="queries.salaryMin"
                type="number"
                placeholder="MIN"
                class="job-search__search-input salary-input job-search__search-input--salary"
              />
              <input
                v-model="queries.salaryMax"
                type="number"
                placeholder="MAX"
                class="job-search__search-input salary-input job-search__search-input--salary"
              />
            </div>
          </div>
        </div>
        <div class="row" :class="{ showFiltersClass: !showFilters }">
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Technologies</span>
            <TagInput
              class="tags"
              :list-items="technologies"
              @technologies="tagsTechnologies"
            />
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Type</span>
            <BaseSelect
              :option-values="offerDetails.TYPES"
              name="type"
              class="job-search__search-input"
              @value-change="getValue"
            />
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Contract</span>
            <BaseSelect
              :option-values="offerDetails.CONTRACTS"
              name="contract"
              class="job-search__search-input"
              @value-change="getValue"
            />
          </div>
        </div>
        <div class="btn-container">
          <div>
            <BaseButton class="add-btn" @click.native="emitFormData">
              {{ buttonText }}
            </BaseButton>
            <BaseClearButton @click="clearFilters">
              Clear filters
            </BaseClearButton>
          </div>
          <div class="btn-filter">
            <font-awesome-icon icon="filter" class="job-search__filter-icon" />
            <button
              class="job-search__filter-btn"
              @click="showFilters = !showFilters"
            >
              <span v-if="showFilters">Hide filters</span>
              <span v-else>More filters</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TagInput from '@/components/TagInput'
import BaseSelect from '@/components/Base/BaseSelect'
import offerDetails from '@/constants/offerDetails'
import technologies from '@/constants/technologies'

export default {
  name: 'JobSearchForm',
  components: {
    TagInput,
    BaseSelect
  },
  props: {
    buttonText: String,
    buttonTextClear: String
  },
  data() {
    return {
      queries: {
        technologies: [],
        location: null,
        category: null,
        seniority: null,
        salaryMin: null,
        salaryMax: null,
        type: null,
        contract: null
      },
      showFilters: false
    }
  },
  created() {
    this.offerDetails = offerDetails
    this.technologies = technologies
  },
  methods: {
    emitFormData() {
      this.$emit('clicked', this.queries)
    },
    clearFilters() {
      this.queries = { technologies: [] }
    },
    tagsTechnologies(techs) {
      this.queries.technologies = techs
    },
    getValue(value, name) {
      this.queries[name] = value
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-container {
  .job-search {
    max-width: $container-width;
    margin: 0 auto;
    .row {
      @include flex(space-between);
      margin-bottom: $margin-lg;
      .tags {
        width: 500px;
      }
    }
    &__filter-btn {
      background: none;
    }
    &__filter-icon {
      font-size: $font-icon-xs;
      margin-right: 0.5rem;
    }
    &__single-input-container {
      @include flex(null, null, column);
    }
    &__input-name {
      @include input-name;
      margin-bottom: $margin-md;
    }
    &__search-input {
      width: 200px;
      &--salary {
        width: 90px;
        margin-right: 20px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    .btn-container {
      @include flex(space-between, center);
    }
    .add-btn {
      margin-right: 1rem;
    }
  }
}
.showFiltersClass {
  display: none !important;
}
</style>
