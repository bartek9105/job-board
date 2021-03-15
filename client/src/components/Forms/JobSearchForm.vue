<template>
  <div class="job-search-filters">
    <x-icon
      size="1.25x"
      class="job-search-filters__close-icon"
      @click="emitCloseFilters"
    />
    <form @submit.prevent>
      <div class="job-search-filters__single-input-container">
        <span class="job-search-filters__input-name">Category</span>
        <BaseSelect
          :option-values="offerDetails.CATEGORIES"
          name="category"
          class="job-search-filters__search-input"
          @value-change="getValue"
        />
      </div>
      <div class="job-search-filters__single-input-container">
        <span class="job-search-filters__input-name">Seniority</span>
        <BaseSelect
          :option-values="offerDetails.SENIORITIES"
          name="seniority"
          class="job-search-filters__search-input"
          @value-change="getValue"
        />
      </div>
      <div class="job-search-filters__single-input-container">
        <span class="job-search-filters__input-name">Salary</span>
        <div
          class="job-search-filters__salary-inputs"
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
      <div class="job-search-filters__single-input-container">
        <span class="job-search-filters__input-name">Type</span>
        <BaseSelect
          :option-values="offerDetails.TYPES"
          name="type"
          class="job-search-filters__search-input"
          @value-change="getValue"
        />
      </div>
      <div class="job-search-filters__single-input-container">
        <span class="job-search-filters__input-name">Contract</span>
        <BaseSelect
          :option-values="offerDetails.CONTRACTS"
          name="contract"
          class="job-search-filters__search-input"
          @value-change="getValue"
        />
      </div>
      <div class="job-search-filters__single-input-container">
        <span class="job-search-filters__input-name">Technologies</span>
        <TagInput
          class="tags"
          :list-items="technologies"
          @items="tagsTechnologies"
        />
      </div>
      <div class="btn-container">
        <div>
          <BaseButton class="add-btn" @click.native="searchOffers">
            {{ buttonText }}
          </BaseButton>
          <BaseClearButton @click="clearFilters">
            Clear filters
          </BaseClearButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import TagInput from '@/components/TagInput'
import BaseSelect from '@/components/Base/BaseSelect'
import offerDetails from '@/constants/offerDetails'
import technologies from '@/constants/technologies'
import BaseSalaryRangeSlider from '@/components/Base/BaseSalaryRangeSlider'
import { XIcon } from 'vue-feather-icons'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'JobSearchForm',
  components: {
    TagInput,
    BaseSelect,
    BaseSalaryRangeSlider,
    XIcon
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
    ...mapActions(['fetchOffers']),
    emitCloseFilters() {
      this.$emit('closeFilters')
    },
    searchOffers() {
      this.fetchOffers(this.queries)
    },
    clearFilters() {
      this.queries = { technologies: [] }
    },
    tagsTechnologies(technologies) {
      this.queries.technologies = technologies.map(
        technology => technology.name
      )
    },
    getValue(value, valueName) {
      this.queries[valueName] = value
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
.job-search-filters {
  @include shadow-hover;
  width: 500px;
  background-color: $white;
  color: $dark-blue;
  padding: $padding-md $padding-lg;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 2;
  &__close-icon {
    @include transition;
    cursor: pointer;
    &:hover {
      color: $dark-blue-hover;
    }
  }
  &__salary-inputs {
    @include flex(null, null, column);
    height: 100%;
  }
  .salary {
    color: $dark-blue;
    font-size: 1rem;
    white-space: nowrap;
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
    text-align: left;
    margin-bottom: $margin-sm;
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
    margin-top: $margin-md;
  }
  .add-btn {
    margin-right: 1rem;
  }
}
.showFiltersClass {
  display: none !important;
}
.salaryUnit {
  flex-direction: column;
  align-items: start !important;
}
.salary-range-slider {
  width: 100% !important;
  margin-top: 1rem;
}
</style>
