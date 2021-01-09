<template>
  <div class="tags">
    <div class="tags-container">
      <BaseTag
        v-for="(tag, index) in technologies"
        :key="index"
        :tag-name="tag"
        :tag-index="index"
        @deletedItem="deleteTag"
      />
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
          :key="filteredTechnology._id"
          :class="{ 'active-item': currentListItem === index }"
          class="tags__input__suggestion-list__list-element"
          @click="createTechnologyTag(filteredTechnology.name)"
        >
          <i
            :class="filteredTechnology.icon"
            class="tags__input__suggestion-list__list-element__icon"
          />
          {{ filteredTechnology.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseTag from '@/components/Base/BaseTag'

export default {
  name: 'TagInput',
  components: {
    BaseTag
  },
  props: {
    technologies: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      technologiesLocal: [...this.technologies],
      technology: '',
      displaySuggestionList: false,
      currentListItem: -1
    }
  },
  methods: {
    ...mapActions(['fetchTechnologies']),
    createTechnologyTag(technology) {
      const isTechnologyAdded = this.technologiesLocal.find(
        technologyEl => technologyEl === technology
      )
      if (!isTechnologyAdded) {
        this.technologiesLocal.push(technology)
        this.technology = ''
      }
      this.technology = ''
    },
    deleteTag(index) {
      this.technologiesLocal.splice(index, 1)
    },
    deleteAllTags() {
      this.technologiesLocal = []
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
  watch: {
    technologiesLocal: function(newVal, oldVal) {
      this.$emit('technologies', newVal)
    }
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
      &__list-element {
        @include flex(null, center);
        padding: 10px;
        &:hover {
          background: $bg-grey;
          cursor: pointer;
        }
        &__icon {
          margin-right: 0.5rem;
          font-size: $font-icon-md;
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
