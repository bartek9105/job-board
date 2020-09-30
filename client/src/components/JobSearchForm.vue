<template>
  <div class="job-search-container">
    <div class="job-search">
      <div class="single-input">
        <span class="input-name">Location</span>
        <input type="text" class="search-input">
      </div>
      <div class="single-input">
        <span class="input-name">Category</span>
        <select name="category" class="search-input">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ui/ux">UI/UX</option>
          <option value="devops">DevOps</option>
        </select>
      </div>
      <div class="single-input">
        <span class="input-name">Type</span>
        <select name="type" class="search-input">
          <option value="fulltime">Fulltime</option>
          <option value="halftime">Halftime</option>
        </select>
      </div>
      <div class="single-input">
        <span class="input-name">Salary</span>
        <div class="salary-inputs">
          <input type="number" placeholder='MIN' class="search-input salary-input">
          <input type="number" placeholder='MAX' class="search-input salary-input">
        </div>
      </div>
      <Button>Search</Button>
    </div>
    <div class="single-input">
      <span class="input-name">Technologies</span>
      <div class="tag-input-container">
        <div class="tag-input-insider">
          <div v-for="(tag, index) in technologyTags" :key="index" class="tag">
            {{ tag }}
            <i class="fas fa-times-circle delete-icon" @click="deleteTag(index)"></i>
          </div>
          <input type="text" class="tag-input" v-model="technology" @keyup.enter="createTechnologyTag" placeholder="Type in technology, press Enter to add more">
          <i class="fas fa-times-circle delete-icon delete-all" v-if="technologyTags.length > 0" @click="deleteAllTags"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'JobSearchForm',
  components: {
    Button
  },
  data () {
    return {
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
  max-width: 1087px;
  margin: 0 auto;
  .input-name {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 28px;
  }
  .job-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    .single-input {
      display: flex;
      flex-direction: column;
      .salary-inputs {
        display: flex;
        .salary-input {
          width: 90px;
          margin-right: 20px;
        }
      }
      .search-input {
        width: 200px;
        height: 35px;
        border: 1px solid $theme-light-blue;
        border-radius: 5px;
        padding: 0 10px;
      }
    }
  }
  .tag-input-container {
    max-width: 100%;
    border: 1px solid $theme-light-blue;
    border-radius: 5px;
    padding: 5px 10px;
    position: relative;
    margin-top: 28px;
    .delete-icon {
      margin-left: 3px;
      cursor: pointer;
    }
    .delete-all {
      position: absolute;
      top: 15px;
      right: 15px;
    }
    .tag-input-insider {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .tag {
        @include tag;
        @include tag-dark;
        display: inline-block;
        margin: 5px 5px 5px 0;
      }
      .tag-input {
        min-width: 200px;
        margin-right: 30px;
        height: 30px;
        outline: none;
        border: none;
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
