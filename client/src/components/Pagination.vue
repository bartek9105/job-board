<template>
  <div class="pagination">
    <button class="pagination__arrow" @click="emitPreviousPage" :disabled="pageNumber === 1">
      <font-awesome-icon icon="long-arrow-alt-left"></font-awesome-icon>
    </button>
    <div class="page-container">
      <button v-for="(item, index) in pages" :key="index" :class="{ pagination__active: pageNumber - 1 === index }" @click=emitPageNumber(index) class="pagination__page">
        {{ index + 1 }}
      </button>
    </div>
    <button class="pagination__arrow" @click="emitNextPage" :disabled="pageNumber === pages">
      <font-awesome-icon icon="long-arrow-alt-right"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {
      pageNumber: 1
    }
  },
  props: {
    pages: Number
  },
  methods: {
    emitPageNumber (index) {
      this.pageNumber = index + 1
      this.$emit('pageChange', this.pageNumber)
    },
    emitPreviousPage () {
      this.pageNumber -= 1
      this.$emit('pageChange', this.pageNumber)
    },
    emitNextPage () {
      this.pageNumber += 1
      this.$emit('pageChange', this.pageNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    @include flex (center, center);
    &__arrow {
      font-size: 1rem;
    }
    &__page {
      @include transition;
      border-radius: 50%;
      background-color: transparent;
      font-size: 1rem;
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
