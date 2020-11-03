<template>
  <div class="pagination">
    <button class="pagination__arrow">
      <i class="fas fa-long-arrow-alt-left"></i>
    </button>
    <div class="page-container">
      <button v-for="(item, index) in new Array(10)" :key="index" class="pagination__page" @click=emitPageNumber(index)>
        {{ index + 1 }}
      </button>
    </div>
    <button class="pagination__arrow">
      <i class="fas fa-long-arrow-alt-right"></i>
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
  methods: {
    emitPageNumber (index) {
      this.pageNumber = index + 1
      this.$emit('clicked', this.pageNumber)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    &__arrow {
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    &__page {
      border: 0;
      border-radius: 50%;
      background-color: transparent;
      cursor: pointer;
      font-size: 1rem;
      height: 30px;
      width: 30px;
      @include transition;
      &:hover {
        background-color: $theme-dark-blue;
        color: #fff;
      }
    }
  }
  .page-container {
    padding: 0 15px;
  }
</style>
