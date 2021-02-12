<template>
  <div class="job-search">
    <h1 class="job-search__heading">
      Type in offer name you are looking for
    </h1>
    <form class="job-search__job-form" @submit.prevent>
      <input
        v-model="query"
        type="text"
        class="job-search__job-form__input"
        placeholder="Offer title"
      />
      <BaseButton @click.native="emitQuery">
        Search
      </BaseButton>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    emitQuery() {
      this.$emit('searchQuery', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search {
  @include flex(center, center, column);
  color: $white-blue;
  height: calc(100% - #{$nav-height * 2});
  &__heading {
    color: $white-blue;
    margin-bottom: $margin-md;
  }
  &__job-form {
    position: relative;
    &__input {
      width: 30rem;
      margin-right: 1rem;
    }
    &__search-icon {
      color: $pink;
      position: absolute;
      top: 8px;
      right: 10px;
    }
  }
}
</style>
