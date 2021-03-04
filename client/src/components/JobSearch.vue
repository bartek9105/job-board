<template>
  <div class="job-search">
    <h1 class="job-search__heading">
      Type in offer name you are looking for
    </h1>
    <form class="job-search__job-form" @submit.prevent>
      <input
        v-model="query.title"
        type="text"
        class="job-search__job-form__input"
        placeholder="Title or keyword"
      />
      <input
        v-model="query.location"
        type="text"
        class="job-search__job-form__input"
        placeholder="Location"
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
      query: {
        title: '',
        location: ''
      }
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
  width: 800px;
  margin: $margin-center;
  color: $white-blue;
  padding: 0 $padding-md;
  text-align: center;
  @media (max-width: 750px) {
    height: 100%;
  }
  &__heading {
    color: $white-blue;
    margin-bottom: $margin-md;
  }
  &__job-form {
    width: 100%;
    display: grid;
    grid-template-columns: (50% 30% auto);
    justify-content: center;
    column-gap: 0.5rem;
    @media (max-width: 750px) {
      @include flex(center, null, column);
      &__input {
        margin-bottom: $margin-sm;
      }
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
