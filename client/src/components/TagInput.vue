<template>
  <div class="tags">
    <div class="tags-container">
      <BaseTag
        v-for="(tag, index) in itemsLocal"
        :key="index"
        :tag-name="tag.name"
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
        @keydown.enter="onEnter"
      />
      <x-icon
        v-if="itemsLocal.length > 0"
        size="1x"
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
          v-for="(filteredItem, index) in filteredItems"
          ref="listElement"
          :key="filteredItem._id"
          :class="{ 'active-item': currentListItem === index }"
          class="tags__input__suggestion-list__list-element"
          @click="createTag(filteredItem)"
        >
          <i
            :class="filteredItem.icon"
            class="tags__input__suggestion-list__list-element__icon"
          />
          {{ filteredItem.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseTag from '@/components/Base/BaseTag'
import { XIcon } from 'vue-feather-icons'

export default {
  name: 'TagInput',
  components: {
    BaseTag,
    XIcon
  },
  props: {
    tagItems: {
      type: Array,
      default: () => []
    },
    listItems: {
      type: Array,
      default: () => []
    },
    isSingle: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      itemsLocal: [...this.tagItems],
      item: '',
      displaySuggestionList: false,
      currentListItem: 0
    }
  },
  computed: {
    filteredItems() {
      if (this.item !== '') {
        return this.listItems.filter(item =>
          item.name.match(new RegExp(`^${this.item}`, 'gi'))
        )
      }
      return this.listItems
    }
  },
  watch: {
    itemsLocal: function(newVal, oldVal) {
      this.$emit('items', newVal)
    },
    item: function(newVal, oldVal) {
      this.currentListItem = 0
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutsideListHandler)
  },
  methods: {
    createTag(item) {
      if (!this.isSingle) {
        const isItemAdded = this.itemsLocal.find(itemEl => itemEl === item)
        if (!isItemAdded) {
          this.itemsLocal.push(item)
        }
      }
      if (this.itemsLocal.length === 0) {
        this.itemsLocal.push(item)
      }
    },
    deleteTag(index) {
      this.itemsLocal.splice(index, 1)
    },
    deleteAllTags() {
      this.itemsLocal = []
    },
    onArrowDown() {
      if (this.currentListItem < this.filteredItems.length - 1) {
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
      const item = this.filteredItems[this.currentListItem]
      this.createTag(item)
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
      color: $dark-blue;
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
          color: $dark-blue;
          background: $bg-grey;
          cursor: pointer;
        }
        &__icon {
          margin-right: 1rem;
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
