<template>
  <div class="tags">
    <div class="tags-container">
      <BaseTag
        v-for="(tag, index) in itemsLocal"
        :key="index"
        :tag-name="tag"
        :tag-index="index"
        @deletedItem="deleteTag"
      />
    </div>
    <div class="tags-input-container">
      <input
        v-model="item"
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
          v-for="(filteredTechnology, index) in listItems"
          ref="listElement"
          :key="filteredTechnology._id"
          :class="{ 'active-item': currentListItem === index }"
          class="tags__input__suggestion-list__list-element"
          @click="createTag(filteredTechnology.name)"
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
import BaseTag from '@/components/Base/BaseTag'

export default {
  name: 'TagInput',
  components: {
    BaseTag
  },
  props: {
    tagItems: {
      type: Array,
      default: () => []
    },
    listItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      itemsLocal: [...this.tagItems],
      item: '',
      displaySuggestionList: false,
      currentListItem: -1
    }
  },
  /*
  computed: {
    getFilteredTechnologies() {
      if (this.technology !== null) {
        return this.getTechnologies.filter(technology =>
          technology.match(new RegExp(`^${this.technology}`, 'gi'))
        )
      }
      return this.getTechnologies
    }
  }, */
  watch: {
    itemsLocal: function(newVal, oldVal) {
      this.$emit('items', newVal)
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutsideListHandler)
  },
  methods: {
    createTag(item) {
      const isItemAdded = this.itemsLocal.find(itemEl => itemEl === item)
      if (!isItemAdded) {
        this.itemsLocal.push(item)
        this.item = ''
      }
      this.item = ''
    },
    deleteTag(index) {
      this.itemsLocal.splice(index, 1)
    },
    deleteAllTags() {
      this.itemsLocal = []
    },
    onArrowDown() {
      if (this.currentListItem < this.itemsLocal.length) {
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
      this.item = this.listItems[this.currentListItem]
      this.createTag(this.item.name)
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
