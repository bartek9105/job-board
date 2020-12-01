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
          <span class="job-search__input-name">Technologies</span>
          <TagInput @technologies="technologies" class="tags"/>
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
            <ClearBtn @click="clearFilters">Clear filters</ClearBtn>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Base/Button'
import TagInput from '@/components/TagInput'
import ClearBtn from '@/components/Base/ClearBtn'

export default {
  name: 'JobSearchForm',
  props: {
    buttonText: String,
    buttonTextClear: String
  },
  components: {
    Button,
    TagInput,
    ClearBtn
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

<style lang="scss" scoped>
.job-search-container {
  .job-search {
    .row {
      @include flex-s-b;
      max-width: $container-width;
      margin: 0 auto $section-m-lg auto;
      .tags {
        width: 500px;
      }
    }
    &__single-input-container {
      @include flex-col;
    }
    &__input-name {
      @include input-name;
      margin-bottom: $section-m-md;
    }
    &__search-input {
      width: 200px;
      height: 35px;
      border: 1px solid $light-blue;
      border-radius: $border-radius-sm;
      padding: 0 10px;
      &--salary {
        width: 90px;
        margin-right: 20px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
