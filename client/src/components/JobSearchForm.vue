<template>
  <div class="job-search-container">
    <div class="job-search">
      <div class="row">
        <div class="job-search__single-input-container">
          <span class="job-search__input-name">Location</span>
          <input type="text" class="job-search__search-input" placeholder="City">
        </div>
        <div class="job-search__single-input-container">
          <span class="job-search__input-name">Category</span>
          <select name="category" class="job-search__search-input">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="ui/ux">UI/UX</option>
            <option value="devops">DevOps</option>
          </select>
        </div>
        <div class="job-search__single-input-container">
          <span class="job-search__input-name">Seniority</span>
          <select name="type" class="job-search__search-input">
            <option value="fulltime">Intern</option>
            <option value="halftime">Junior</option>
            <option value="halftime">Regular</option>
            <option value="halftime">Senior</option>
          </select>
        </div>
        <div class="job-search__single-input-container">
          <span class="job-search__input-name">Salary</span>
          <div class="job-search__salary-inputs">
            <input type="number" placeholder='MIN' class="job-search__search-input salary-input job-search__search-input--salary">
            <input type="number" placeholder='MAX' class="job-search__search-input salary-input job-search__search-input--salary">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="job-search__tags-input-container">
          <span class="job-search__input-name">Technologies</span>
          <div class="job-search__tag-input">
            <div class="job-search__tag-input-insider">
              <div v-for="(tag, index) in technologyTags" :key="index" class="job-search__tag-input__tag">
                {{ tag }}
                <i class="fas fa-times-circle job-search__tag-input__delete-icon" @click="deleteTag(index)"></i>
              </div>
              <input type="text" class="job-search__tag-input__inner" v-model="technology" @keyup.enter="createTechnologyTag" placeholder="Type in technology, press Enter to add more">
              <i class="fas fa-times-circle job-search__tag-input__delete-all-icon" v-if="technologyTags.length > 0" @click="deleteAllTags"></i>
            </div>
          </div>
        </div>
        <div class="job-search__single-input-container">
          <span class="job-search__input-name">Type</span>
          <select name="type" class="job-search__search-input">
            <option value="fulltime">Full Time</option>
            <option value="halftime">Part Time</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobSearchForm',
  components: {
  },
  data () {
    return {
      showFilters: false,
      technology: null,
      technologyTags: []
    }
  },
  methods: {
    createTechnologyTag () {
      this.technologyTags.push(this.technology)
      this.technology = null
    },
    deleteTag (index) {
      this.technologyTags.splice(index, 1)
    },
    deleteAllTags () {
      this.technologyTags = []
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
