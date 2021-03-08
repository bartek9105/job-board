<template>
  <div class="job-search-container">
    <div class="job-search">
      <form @submit.prevent>
        <div class="row" :class="{ displayAsColumn: isMedium }">
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
            <div
              class="job-search__salary-inputs"
              :class="{ salaryUnit: isMedium }"
            >
              <span class="salary"
                >{{ queries.salaryMin }} - {{ queries.salaryMax }} PLN
              </span>
              <BaseSalaryRangeSlider
                class="salary-range-slider"
                :salary-min="queries.salaryMin"
                :salary-max="queries.salaryMax"
                @salaryRange="salary"
              />
            </div>
          </div>
        </div>
        <div class="row" :class="{ displayAsColumn: isMedium }">
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
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Technologies</span>
            <TagInput
              class="tags"
              :list-items="technologies"
              @technologies="tagsTechnologies"
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
import BaseSalaryRangeSlider from '@/components/Base/BaseSalaryRangeSlider'
import { mapGetters } from 'vuex'

export default {
  name: 'JobSearchForm',
  components: {
    TagInput,
    BaseSelect,
    BaseSalaryRangeSlider
  },
  props: {
    buttonText: String,
    buttonTextClear: String
  },
  data() {
    return {
      queries: {
        technologies: [],
        category: null,
        seniority: null,
        salaryMin: 0,
        salaryMax: 50000,
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
    },
    salary(salary) {
      const [salaryMin, salaryMax] = salary
      this.queries.salaryMin = salaryMin
      this.queries.salaryMax = salaryMax
    }
  },
  computed: {
    ...mapGetters(['isMedium'])
  }
}
</script>

<style lang="scss" scoped>
.job-search-container {
  .job-search {
    @include shadow-hover;
    background-color: $white;
    max-width: $container-width;
    margin: 0 auto;
    color: $dark-blue;
    padding: $padding-md $padding-lg;
    border-radius: 0 0 5px 5px;
    position: relative;
    z-index: 2;
    .row {
      display: grid;
      grid-template-columns: (20% 20% auto);
      column-gap: 3rem;
      margin-bottom: $margin-lg;
    }
    &__salary-inputs {
      @include flex(null, center);
      height: 100%;
    }
    .salary {
      white-space: nowrap;
      font-size: 1rem;
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
      //margin-bottom: $margin-md;
      margin: $margin-sm 0;
    }
    &__search-input {
      width: 100%;
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
.displayAsColumn {
  display: flex !important;
  flex-direction: column;
  margin-bottom: $margin-sm !important;
}
.salaryUnit {
  flex-direction: column;
  align-items: start !important;
}
.salary-range-slider {
  width: 90% !important;
  margin-top: 0.5rem;
  margin-left: 2rem;
}
</style>
