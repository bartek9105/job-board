<template>
  <div class="pagination">
    <button
      class="pagination__arrow"
      :disabled="pageNumber === 1"
      @click="emitPreviousPage"
    >
      <font-awesome-icon icon="long-arrow-alt-left" />
    </button>
    <div class="page-container">
      <button
        v-for="(item, index) in pages"
        :key="index"
        :class="{ pagination__active: pageNumber - 1 === index }"
        class="pagination__page"
        @click="emitPageNumber(index)"
      >
        {{ index + 1 }}
      </button>
    </div>
    <button
      class="pagination__arrow"
      :disabled="pageNumber === pages"
      @click="emitNextPage"
    >
      <font-awesome-icon icon="long-arrow-alt-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: Number
  },
  data() {
    return {
      pageNumber: 1
    }
  },
  methods: {
    emitPageNumber(index) {
      this.pageNumber = index + 1
      this.$emit('pageChange', this.pageNumber)
    },
    emitPreviousPage() {
      this.pageNumber -= 1
      this.$emit('pageChange', this.pageNumber)
    },
    emitNextPage() {
      this.pageNumber += 1
      this.$emit('pageChange', this.pageNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  @include flex(center, center);
  &__arrow {
    font-size: $font-icon-sm;
  }
  &__page {
    @include transition;
    border-radius: 50%;
    background-color: transparent;
    font-size: $font-content-lg;
    font-weight: $font-regular-bold;
    height: 30px;
    width: 30px;
    &:hover {
      background-color: $dark-blue;
      color: $white;
    }
  }
  &__active {
    background-color: $dark-blue;
    color: $white;
  }
}
.page-container {
  padding: 0 15px;
}
</style>
