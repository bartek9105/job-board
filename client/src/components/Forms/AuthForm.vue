<template>
  <div class="auth">
    <div class="img-container">
      <div class="img-overlay" />
    </div>
    <div class="form-container">
      <h1 class="auth__header">
        <slot name="header" />
      </h1>
      <form class="auth__form" @submit.prevent>
        <div class="form-unit">
          <label for="email" class="auth__form__label">E-mail</label>
          <input
            v-model="credentials.email"
            type="email"
            name="email"
            placeholder="Type in your e-mail address"
            @change="emitEmail"
          />
        </div>
        <div class="form-unit">
          <label for="password" class="auth__form__label">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            name="password"
            placeholder="Type in your password"
            @change="emitPassword"
          />
        </div>
        <span class="auth__form__info">
          <slot name="info" />
          <router-link :to="routerLink" class="auth__form__info__action">
            <slot name="info-action" />
          </router-link>
        </span>
        <slot name="btn" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  props: {
    infoRoute: String
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    routerLink() {
      return this.infoRoute
    }
  },
  methods: {
    emitEmail() {
      this.$emit('email', this.credentials.email)
    },
    emitPassword() {
      this.$emit('password', this.credentials.password)
    }
  }
}
</script>

<style lang="scss">
.auth {
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
  .form-unit {
    @include flex(null, null, column);
    margin-bottom: $margin-md;
    width: 100%;
  }
  @include flex();
  &__header {
    margin-bottom: $margin-lg;
  }
  &__form {
    @include flex(null, center, column);
    width: 50%;
    &__label {
      @include input-name;
      margin-bottom: $margin-sm;
    }
    &__info {
      color: $dark-blue;
      font-size: $font-content-md;
      font-weight: $font-bold;
      margin-bottom: $margin-md;
      &__action {
        color: $pink;
        &:hover {
          color: $pink-hover;
        }
      }
    }
    &__alt {
      @include flex(null, center, column);
      margin-top: $margin-md;
      hr {
        background-color: $light-blue;
        border: 0;
        margin: $margin-sm 0;
        height: 1px;
        width: 100%;
      }
      &__btn {
        @include flex(center, center);
        width: 250px;
        color: $white;
        padding: $padding-sm;
        font-size: $font-content-md;
        border: $input-select-border;
        border-radius: $border-radius-sm;
        margin-top: $margin-sm;
        &--facebook {
          background-color: $facebook;
        }
        &--google {
          background-color: $google;
        }
        &__icon {
          font-size: $font-content-lg;
          margin-right: 1rem;
        }
        &:hover {
          @include shadow-hover;
        }
      }
    }
  }
}
</style>
