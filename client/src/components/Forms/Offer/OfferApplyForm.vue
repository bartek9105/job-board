<template>
  <form class="apply-form" @submit.prevent>
    <div class="apply-form__personal-info">
      <span class="apply-form__name">Name</span>
      <input type="text" class="apply-form__input" />
    </div>
    <div class="apply-form__personal-info">
      <span class="apply-form__name">E-mail</span>
      <input type="text" class="apply-form__input" />
    </div>
    <div class="apply-form__description">
      <span class="apply-form__name">Description</span>
      <textarea type="text" rows="5" class="apply-form__textarea" />
    </div>
  </form>
</template>

<script>
export default {
  name: 'OfferApplyForm'
}
</script>

<style lang="scss" scoped>
.apply-form {
  > * {
    @include flex(null, null, column);
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
