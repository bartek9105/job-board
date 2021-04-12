<template>
  <div>
    <div v-on-clickaway="emitCloseFilters" class="job-search-filters">
      <x-icon
        size="1.25x"
        class="job-search-filters__close-icon"
        @click="emitCloseFilters"
      />
      <form @submit.prevent>
        <div class="job-search-filters__single-input-container">
          <BaseSelect
            v-model="queries.category"
            :option-values="offerDetails.CATEGORIES"
            name="category"
            class="job-search-filters__search-input"
            label="Categories"
          />
        </div>
        <div class="job-search-filters__single-input-container">
          <BaseSelect
            v-model="queries.seniority"
            :option-values="offerDetails.SENIORITIES"
            name="seniority"
            class="job-search-filters__search-input"
            label="Seniority"
          />
        </div>
        <div class="job-search-filters__single-input-container">
          <div
            class="job-search-filters__salary-inputs"
            :class="{ salaryUnit: isMedium }"
          >
            <BaseSalaryRangeSlider
              class="salary-range-slider"
              :salary-min="queries.salaryMin"
              :salary-max="queries.salaryMax"
              title="Salary"
              @salaryRange="salary"
            />
          </div>
        </div>
        <div class="job-search-filters__single-input-container">
          <BaseSelect
            v-model="queries.type"
            :option-values="offerDetails.TYPES"
            name="type"
            class="job-search-filters__search-input"
            label="Type"
          />
        </div>
        <div class="job-search-filters__single-input-container">
          <BaseSelect
            v-model="queries.contract"
            :option-values="offerDetails.CONTRACTS"
            name="contract"
            class="job-search-filters__search-input"
            label="Contract"
          />
        </div>
        <div class="job-search-filters__single-input-container">
          <TagInput
            class="tags"
            :list-items="technologies"
            label="Technologies"
            @items="tagsTechnologies"
          />
        </div>
        <div class="btn-container">
          <div>
            <BaseButton class="add-btn" @click.native="emitSearchQueries">
              {{ buttonText }}
            </BaseButton>
          </div>
        </div>
      </form>
    </div>
    <div class="overlay" />
  </div>
</template>

<script>
import TagInput from '@/components/TagInput'
import BaseSelect from '@/components/Base/BaseSelect'
import offerDetails from '@/constants/offerDetails'
import technologies from '@/constants/technologies'
import BaseSalaryRangeSlider from '@/components/Base/BaseSalaryRangeSlider'
import { XIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'JobSearchForm',
  components: {
    TagInput,
    BaseSelect,
    BaseSalaryRangeSlider,
    XIcon
  },
  mixins: [clickaway],
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
    emitCloseFilters() {
      this.$emit('closeFilters')
    },
    emitSearchQueries() {
      this.emitCloseFilters()
      this.$emit('searchQueries', this.queries)
    },
    clearFilters() {
      this.queries = { category: null }
    },
    tagsTechnologies(technologies) {
      this.queries.technologies = technologies.map(
        technology => technology.name
      )
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
  z-index: 3;
  overflow-y: scroll;
  form {
    margin-top: $margin-sm;
  }
  &__close-icon {
    @include transition;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
      color: $white;
      background-color: $light-blue;
      border-radius: 50%;
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
    margin-bottom: $margin-md;
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
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
  cursor: pointer;
}
</style>
