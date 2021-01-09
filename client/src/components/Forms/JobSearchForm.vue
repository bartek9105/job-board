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
            <select
              v-model="queries.category"
              name="category"
              class="job-search__search-input"
            >
              <option value="Frontend">
                Frontend
              </option>
              <option value="Backend">
                Backend
              </option>
              <option value="UX/UI">
                UI/UX
              </option>
              <option value="Devops">
                DevOps
              </option>
              <option value="Devops">
                Data Science
              </option>
              <option value="Devops">
                Testing
              </option>
              <option value="Devops">
                PM
              </option>
            </select>
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Seniority</span>
            <select
              v-model="queries.seniority"
              name="type"
              class="job-search__search-input"
            >
              <option value="Intern">
                Intern
              </option>
              <option value="Junior">
                Junior
              </option>
              <option value="Regular">
                Regular
              </option>
              <option value="Senior">
                Senior
              </option>
            </select>
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
        <div class="row">
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Technologies</span>
            <TagInput
              class="tags"
              :technologies="queries.technologies"
              @technologies="tagsTechnologies"
            />
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Type</span>
            <select
              v-model="queries.type"
              name="type"
              class="job-search__search-input"
            >
              <option value="Full Time">
                Full Time
              </option>
              <option value="Part Time">
                Part Time
              </option>
            </select>
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Contract</span>
            <select
              v-model="queries.contract"
              name="type"
              class="job-search__search-input"
            >
              <option value="B2B">
                B2B
              </option>
              <option value="Employment contract">
                Employment contract
              </option>
              <option value="Mandatory contract">
                Mandatory contract
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="btn-container">
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
import BaseButton from '@/components/Base/Buttons/BaseButton'
import BaseClearButton from '@/components/Base/Buttons/BaseClearButton'
import TagInput from '@/components/TagInput'

export default {
  name: 'JobSearchForm',
  components: {
    BaseButton,
    BaseClearButton,
    TagInput
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
  methods: {
    emitFormData() {
      this.$emit('clicked', this.queries)
    },
    clearFilters() {
      this.queries = { technologies: [] }
    },
    tagsTechnologies(techs) {
      this.queries.technologies = techs
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search-container {
  .job-search {
    .row {
      @include flex(space-between);
      max-width: $container-width;
      margin: 0 auto $margin-lg auto;
      .tags {
        width: 500px;
      }
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
    .add-btn {
      margin-right: 1rem;
    }
  }
}
</style>
