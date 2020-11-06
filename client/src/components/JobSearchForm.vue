<template>
  <div class="job-search-container">
    <div class="job-search">
      <form @submit.prevent>
        <div class="row">
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Location</span>
            <input type="text" class="job-search__search-input" placeholder="City" v-model="queries.location">
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Category</span>
            <select name="category" class="job-search__search-input" v-model="queries.category">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UX/UI">UI/UX</option>
              <option value="Devops">DevOps</option>
              <option value="Devops">Data Science</option>
              <option value="Devops">Testing</option>
              <option value="Devops">PM</option>
            </select>
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Seniority</span>
            <select name="type" class="job-search__search-input" v-model="queries.seniority">
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Regular">Regular</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Salary</span>
            <div class="job-search__salary-inputs">
              <input type="number" placeholder='MIN' class="job-search__search-input salary-input job-search__search-input--salary" v-model="queries.salaryMin">
              <input type="number" placeholder='MAX' class="job-search__search-input salary-input job-search__search-input--salary" v-model="queries.salaryMax">
            </div>
          </div>
        </div>
        <div class="row">
          <TagInput @technologies="technologies"/>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Type</span>
            <select name="type" class="job-search__search-input" v-model="queries.type">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Contract</span>
            <select name="type" class="job-search__search-input" v-model="queries.contract">
              <option value="B2B">B2B</option>
              <option value="Employment contract">Employment contract</option>
              <option value="Mandatory contract">Mandatory contract</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="button-container">
            <Button @click.native="emitFormData">{{ buttonText }}</Button>
            <button class="job-search__clear-filters-btn" @click="clearFilters">{{ buttonTextClear }}</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import TagInput from '@/components/TagInput'

export default {
  name: 'JobSearchForm',
  props: {
    buttonText: String,
    buttonTextClear: String
  },
  components: {
    Button,
    TagInput
  },
  data () {
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
    emitFormData () {
      this.$emit('clicked', this.queries)
    },
    clearFilters () {
      this.queries = { technologies: [] }
    },
    technologies (techs) {
      this.queries.technologies = techs
    }
  }
}
</script>

<style lang="scss">
.job-search-container {
  .job-search {
    .row {
      display: flex;
      justify-content: space-between;
      max-width: 1087px;
      margin: 0 auto 50px auto;
    }
    &__single-input-container {
      display: flex;
      flex-direction: column;
    }
    &__input-name {
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 28px;
    }
    &__search-input {
      width: 200px;
      height: 35px;
      border: 1px solid $theme-light-blue;
      border-radius: 5px;
      padding: 0 10px;
      &--salary {
        width: 90px;
        margin-right: 20px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    &__clear-filters-btn {
      cursor: pointer;
      margin-left: 20px;
      background: transparent;
      font-weight: 700;
      border: none;
      color: $theme-dark-blue;
    }
  }
}
</style>
