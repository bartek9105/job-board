<template>
  <div>
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
        <div v-for="(tag, index) in technologyTags" :key="index" class="tag">
          {{ tag }}
          <i class="fas fa-times-circle delete-icon" @click="deleteTag(index)"></i>
        </div>
        <input type="text" class="tag-input" v-model="technology" @keyup.enter="createTechnologyTag" placeholder="Type in technology, press Enter to add more">
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
    }
  }
}
</script>

<style lang="scss">
  .job-search {
    display: flex;
    justify-content: space-between;
  }
  .single-input {
    display: flex;
    flex-direction: column;
    .tag-input-container {
      border: 1px solid $theme-light-blue;
      padding: 5px 10px;
      .delete-icon {
        margin-left: 3px;
        cursor: pointer;
      }
    }
    .tag {
      @include tag;
      @include tag-dark;
      display: inline-block;
      margin-right: 5px;
    }
    .tag-input {
      min-width: 300px;
      border: none;
      height: 35px;
      outline: none;
    }
    .input-name {
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 28px;
    }
    .salary-inputs {
      display: flex;
      .salary-input {
        width: 90px;
        margin-right: 30px;
      }
    }
  }
  .search-input {
    width: 200px;
    height: 35px;
    border: 1px solid $theme-light-blue;
    border-radius: 5px;
    padding: 0 10px;
  }
</style>
