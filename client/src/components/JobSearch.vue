<template>
  <div class="job-search">
    <h1 class="job-search__heading">
      Search through over 509 code job offers
    </h1>
    <form class="job-search__job-form" @submit.prevent>
      <input
        v-model="titleQuery"
        type="text"
        class="job-search__job-form__input"
        placeholder="Type in job you are looking for"
      />
      <font-awesome-icon
        icon="search"
        class="job-search__job-form__search-icon"
      />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleQuery: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.job-search {
  @include flex(center, center, column);
  color: $white-blue;
  height: calc(100% - #{$nav-height});
  &__heading {
    color: $white-blue;
    margin-bottom: $margin-md;
  }
  &__job-form {
    position: relative;
    &__input {
      width: 30rem;
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
