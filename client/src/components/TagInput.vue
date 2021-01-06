<template>
  <div class="tags">
    <div class="tags-container">
      <div v-for="(tag, index) in technologies" :key="index" class="tags__tag">
        {{ tag }}
        <font-awesome-icon
          icon="times-circle"
          class="tags__tag__delete-icon"
          @click="deleteTag(index)"
        />
      </div>
    </div>
    <div class="tags-input-container">
      <input
        v-model="technology"
        type="text"
        class="tags__input"
        placeholder="Type in technology, press Enter to add more"
        @focus="displaySuggestionList = true"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter.prevent="onEnter"
      />
      <font-awesome-icon
        v-if="technologies.length > 0"
        icon="times-circle"
        class="tags__input__delete-all-icon"
        @click="deleteAllTags"
      />
      <ul
        v-show="displaySuggestionList === true"
        ref="listContainer"
        class="tags__input__suggestion-list"
        @blur="displaySuggestionList = false"
      >
        <li
          v-for="(filteredTechnology, index) in getTechnologies"
          ref="listElement"
          :key="index"
          :class="{ 'active-item': currentListItem === index }"
          @click="createTechnologyTag(filteredTechnology.name)"
        >
          {{ filteredTechnology.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TagInput',
  data() {
    return {
      technologies: [],
      technology: '',
      displaySuggestionList: false,
      currentListItem: -1
    }
  },
  methods: {
    ...mapActions(['fetchTechnologies']),
    createTechnologyTag(technology) {
      const isTechnologyAdded = this.technologies.find(
        technologyEl => technologyEl === technology
      )
      if (!isTechnologyAdded) {
        this.technologies.push(technology)
        this.technology = ''
        this.$emit('technologies', this.technologies)
      }
      this.technology = ''
    },
    deleteTag(index) {
      this.technologies.splice(index, 1)
    },
    deleteAllTags() {
      this.technologies = []
    },
    onArrowDown() {
      if (this.currentListItem < this.getTechnologies.length) {
        this.currentListItem++
        this.fixScrolling()
      }
    },
    onArrowUp() {
      if (this.currentListItem > 0) {
        this.currentListItem--
        this.fixScrolling()
      }
    },
    onEnter() {
      this.technology = this.getTechnologies[this.currentListItem]
      this.createTechnologyTag(this.technology.name)
    },
    clickOutsideListHandler(evt) {
      if (!this.$el.contains(evt.target)) {
        this.displaySuggestionList = false
        this.currentListItem = -1
      }
    },
    fixScrolling() {
      const listElement = this.$refs.listElement[this.currentListItem]
      if (listElement) {
        listElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getTechnologies'])
    /*
    getFilteredTechnologies() {
      if (this.technology !== null) {
        return this.getTechnologies.filter(technology =>
          technology.match(new RegExp(`^${this.technology}`, 'gi'))
        )
      }
      return this.getTechnologies
    }
    */
  },
  mounted() {
    document.addEventListener('click', this.clickOutsideListHandler)
    this.fetchTechnologies()
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
  display: flex;
  align-items: center;
  position: relative;
}
.tags {
  &__tag {
    @include tag;
    @include tag-dark;
    display: inline-block;
    margin-right: 5px;
    margin-bottom: $margin-xsm;
    &__delete-icon {
      margin-left: 3px;
      cursor: pointer;
    }
  }
  &__input {
    width: 100%;
    margin-right: 1rem;
    &__delete-all-icon {
      cursor: pointer;
    }
    &__suggestion-list {
      @include shadow;
      position: absolute;
      top: 50px;
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
  &__inner {
    @include input-text-overflow;
    width: 100%;
    height: 35px;
    outline: none;
    border: none;
    flex: 1;
  }
}
</style>
