<template>
  <div class="auth">
    <div class="img-container">
      <div class="img-overlay" />
    </div>
    <div class="form-container">
      <h1 class="auth__header">
        <slot name="header" />
      </h1>
      <div class="auth__form">
        <slot name="form" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm'
}
</script>

<style lang="scss" scoped>
.auth {
  @include flex();
  .img-container {
    width: 40%;
    height: 100vh;
    background: url('../../assets/images/banner.jpg') no-repeat;
    background-position: center center;
    background-size: cover;
    .img-overlay {
      width: 100%;
      height: 100%;
      background: $dark-blue;
      opacity: $opacity-high;
    }
  }
  .form-container {
    @include flex(center, center, column);
    background: url('../../assets/images/pattern.svg') no-repeat;
    background-position: center center;
    background-size: cover;
    width: 60%;
  }
  &__header {
    margin-bottom: $margin-lg;
  }
  &__form {
    @include flex(null, center, column);
    min-width: 500px;
    form {
      @include flex(null, center, column);
      width: 100%;
      input {
        width: 100%;
        margin-bottom: $margin-sm;
      }
      .info {
        font-size: $font-content-lg;
        margin-bottom: $margin-md;
      }
    }
  }
}
</style>
