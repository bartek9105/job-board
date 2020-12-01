<template>
  <form @submit.prevent class="apply-form">
    <div class="apply-form__personal-info">
      <span class="apply-form__name">Name</span>
      <input type="text" class="apply-form__input">
    </div>
    <div class="apply-form__personal-info">
      <span class="apply-form__name">E-mail</span>
      <input type="text" class="apply-form__input">
    </div>
    <div class="apply-form__description">
      <span class="apply-form__name">Description</span>
      <textarea type="text" rows="5" class="apply-form__textarea"></textarea>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ApplyForm'
}
</script>

<style lang="scss" scoped>
  .apply-form {
    > * {
      @include flex (_, _, column);
    }
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
    &__description {
      grid-column: 1/3;
    }
    &__name {
      @include input-name;
      margin-bottom: $margin-sm;
    }
  }
</style>
