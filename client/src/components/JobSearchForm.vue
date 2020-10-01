<template>
  <div class="job-search-container">
    <div class="job-search">
      <div class="single-input">
        <span class="input-name">Location</span>
        <input type="text" class="search-input" placeholder="City">
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
        <span class="input-name">Seniority</span>
        <select name="type" class="search-input">
          <option value="fulltime">Intern</option>
          <option value="halftime">Junior</option>
          <option value="halftime">Regular</option>
          <option value="halftime">Senior</option>
        </select>
      </div>
      <div class="single-input">
        <span class="input-name">Salary</span>
        <div class="salary-inputs">
          <input type="number" placeholder='MIN' class="search-input salary-input">
          <input type="number" placeholder='MAX' class="search-input salary-input">
        </div>
      </div>
    </div>
    <i class="fas fa-sliders-h" @click="showPopup = !showPopup"></i> More filters
    <div :class="{ popup: showPopup }">
    <div class="bottom">
      <div class="single-input simple-input-tags">
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
      <div class="single-input">
        <span class="input-name">Type</span>
        <select name="type" class="search-input">
          <option value="fulltime">Full Time</option>
          <option value="halftime">Part Time</option>
        </select>
      </div>
      <div class="remote-check">
        <i class="far fa-check-square"></i>
        Remote
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
      showPopup: false,
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
.popup {
  display: none;
  width: 50vh;
  height: 50vh;
  z-index: 1;
}
.job-search-container {
  .search-input {
    width: 200px;
    height: 35px;
    border: 1px solid $theme-light-blue;
    border-radius: 5px;
    padding: 0 10px;
  }
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
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    .simple-input-tags {
      width: 100%;
      margin-right: 30px;
    }
    .single-input {
      margin-right: 30px;
      .search-input {
        margin-top: 30px;
      }
    }
    .tag-input-container {
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
        top: 12px;
        right: 10px;
      }
      .tag-input-insider {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .tag {
          @include tag;
          @include tag-dark;
          display: inline-block;
          margin-right: 5px;
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
    .remote-check {
      margin-top: 50px;
      display: flex;
      i {
        margin-right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
