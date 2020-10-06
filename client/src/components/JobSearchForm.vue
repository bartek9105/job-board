<template>
  <div class="job-search-container">
    <div class="job-search">
      <form @change=fetchJobOffers(queries) @submit.prevent>
        <div class="row">
          <div class="job-search__single-input-container">
            <span class="job-search__input-name">Location</span>
            <input type="text" class="job-search__search-input" placeholder="City" v-model="queries.location" @change=fetchJobOffers(queries)>
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
          <div class="job-search__tags-input-container">
            <span class="job-search__input-name">Technologies</span>
            <div class="job-search__tag-input">
              <div class="job-search__tag-input-insider">
                <div v-for="(tag, index) in queries.technologies" :key="index" class="job-search__tag-input__tag">
                  {{ tag }}
                  <i class="fas fa-times-circle job-search__tag-input__delete-icon" @click="deleteTag(index)"></i>
                </div>
                <input type="text" class="job-search__tag-input__inner" v-model="technology" @keyup.enter="createTechnologyTag" placeholder="Type in technology, press Enter to add more">
                <i class="fas fa-times-circle job-search__tag-input__delete-all-icon" v-if="queries.technologies.length > 0" @click="deleteAllTags"></i>
              </div>
            </div>
          </div>
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
      </form>
    </div>
    <button @click="fetchJobOffers(queries)">Search</button>
    <button @click="clearFilters">Clear filters</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'JobSearchForm',
  components: {
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
      showFilters: false,
      technology: null
    }
  },
  methods: {
    ...mapActions(['fetchJobOffers']),
    clearFilters () {
      this.queries = { technologies: [] }
      this.fetchJobOffers({})
    },
    createTechnologyTag () {
      if (this.technology !== '' && this.technology !== null) {
        this.queries.technologies.push(this.technology.trim())
      }
      this.technology = null
    },
    deleteTag (index) {
      this.queries.technologies.splice(index, 1)
    },
    deleteAllTags () {
      this.queries.technologies = []
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
    &__tags-input-container {
      width: 100%;
      margin-right: 30px;
    }
    &__tag-input {
      border: 1px solid $theme-light-blue;
      border-radius: 5px;
      padding: 0 10px;
      position: relative;
      margin-top: 28px;
      &-insider {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      &__delete-icon {
        margin-left: 3px;
        cursor: pointer;
      }
      &__delete-all-icon {
        position: absolute;
        top: 7px;
        right: 10px;
      }
      &__inner {
        min-width: 200px;
        margin-right: 30px;
        height: 35px;
        outline: none;
        border: none;
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &__tag {
        @include tag;
        @include tag-dark;
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
}
</style>
