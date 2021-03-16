<template>
  <div class="dashboard-container">
    <h1>Password</h1>
    <form class="password-form" @submit.prevent>
      <div class="password-form__unit">
        <label for="old-password" class="password-form__label"
          >Old password</label
        >
        <input type="password" name="old-password" />
      </div>
      <div class="password-form__unit">
        <label for="new-password" class="password-form__label"
          >New password</label
        >
        <input type="password" name="new-password" />
      </div>
      <BaseButton class="password-form__btn">
        Save
      </BaseButton>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfilePassword'
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  @include shadow;
  width: 700px;
  background-color: $white;
  border-radius: $border-radius-sm;
  padding: $padding-lg;
  h1 {
    font-weight: $font-semi-bold;
    margin-bottom: $margin-lg;
  }
}
.password-form {
  max-width: 1000px;
  &__unit {
    @include flex(null, null, column);
    margin-bottom: $margin-sm;
  }
  &__label {
    @include input-name;
    margin-bottom: $margin-sm;
  }
  &__btn {
    margin-top: $margin-sm;
  }
}
</style>
