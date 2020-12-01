<template>
  <div>
    <div class="tags-input-container">
      <div class="tag-input">
      <div class="tag-input-insider">
        <div v-for="(tag, index) in technologies" :key="index" class="tag-input__tag">
          {{ tag }}
          <i class="fas fa-times-circle tag-input__delete-icon" @click="deleteTag(index)"></i>
        </div>
          <input type="text" class="tag-input__inner" v-model="technology" placeholder="Type in technology, press Enter to add more" @focus="displaySuggestionList = true" @keydown.down="onArrowDown" @keydown.up="onArrowUp" @keydown.enter="onEnter">
          <i class="fas fa-times-circle tag-input__delete-all-icon" v-if="technologies.length > 0" @click="deleteAllTags"></i>
        </div>
        <ul class="tag-input__suggestion-list" v-if="displaySuggestionList === true" @blur="displaySuggestionList = false">
          <li v-for="(filteredTechnology, index) in getFilteredTechnologies" :key="index" @click="createTechnologyTag(filteredTechnology)" @keyup.enter="createTechnologyTag(filteredTechnology)" :class='{"active-item": currentListItem === index}'>
            {{ filteredTechnology }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TagInput',
  data () {
    return {
      technologies: [],
      technology: '',
      displaySuggestionList: false,
      currentListItem: -1
    }
  },
  methods: {
    createTechnologyTag (filteredTechnology) {
      this.technology = filteredTechnology
      if (this.technology !== '' && this.technology !== null) {
        this.technologies.push(this.technology.trim())
      }
      this.$emit('technologies', this.technologies)
      this.technology = null
      this.currentListItem = -1
    },
    deleteTag (index) {
      this.technologies.splice(index, 1)
    },
    deleteAllTags () {
      this.technologies = []
    },
    onArrowDown () {
      if (this.currentListItem < this.getFilteredTechnologies.length) {
        this.currentListItem++
      }
    },
    onArrowUp () {
      if (this.currentListItem > 0) {
        this.currentListItem--
      }
    },
    onEnter () {
      this.technology = this.getFilteredTechnologies[this.currentListItem]
      this.createTechnologyTag(this.technology)
    },
    clickOutsideListHandler (evt) {
      if (!this.$el.contains(evt.target)) {
        this.displaySuggestionList = false
        this.currentListItem = -1
      }
    }
  },
  computed: {
    ...mapGetters(['getTechnologies']),
    getFilteredTechnologies () {
      if (this.technology !== null) {
        return this.getTechnologies.filter(technology => technology.match(new RegExp(`^${this.technology}`, 'gi')))
      }
      return this.getTechnologies
    }
  },
  mounted () {
    document.addEventListener('click', this.clickOutsideListHandler)
  }
}
</script>

<style lang="scss" scoped>
  .active-item {
    background: $dark-blue;
    color: $white;
    border-radius: $border-radius-sm;
  }
  .tags-input-container {
    .input-name {
      @include input-name;
    }
  }
  .tag-input {
    border: 1px solid $light-blue;
    border-radius: $border-radius-sm;
    padding: 0 10px;
    position: relative;
    &-insider {
      @include flex (null, center);
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
      cursor: pointer;
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
    &__suggestion-list {
      @include shadow;
      position: absolute;
      top: 110%;
      left: 0;
      border: 1px solid $bg-grey;
      padding: 10px;
      width: 100%;
      background: $white;
      z-index: 1;
      max-height: 300px;
      overflow-y: auto;
      li {
        padding: 10px;
        &:hover {
          background: $bg-grey;
          cursor: pointer;
        }
      }
    }
  }
</style>
