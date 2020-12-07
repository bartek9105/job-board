<template>
    <div class="register">
        <div class="left-side">
            <div class="bg-overlay"></div>
        </div>
        <div class="right-side">
            <h1 class="register__header">
                <slot name="header"></slot>
            </h1>
            <form @submit.prevent class="register__form">
                <div class="form-unit">
                    <label for="email" class="register__form__label">E-mail</label>
                    <input type="email" name="email" placeholder="Type in your e-mail address">
                </div>
                <div class="form-unit">
                    <label for="password" class="register__form__label">Password</label>
                    <input type="password" name="password" placeholder="Type in your password">
                </div>
                <span class="register__form__info">
                    <slot name="info"></slot>
                    <router-link :to="routerLink" class="register__form__info__login">
                        <slot name="info-action"></slot>
                    </router-link>
                </span>
                <router-link to="/">
                    <Button>
                        <slot name="btn-text"></slot>
                    </Button>
                </router-link>
                <div class="register__form__alt">
                    <hr>
                    <span>Or</span>
                    <button class="register__form__alt__btn register__form__alt__btn--facebook">
                        <font-awesome-icon :icon="['fab', 'facebook']" class="register__form__alt__btn__icon"/>
                        Sign in with Facebook
                    </button>
                    <button class="register__form__alt__btn register__form__alt__btn--google">
                        <font-awesome-icon :icon="['fab', 'google']" class="register__form__alt__btn__icon"/>
                        Sign in with Google
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Base/Button'

export default {
  name: 'Auth',
  props: {
    infoRoute: String
  },
  components: {
    Button
  },
  computed: {
    routerLink () {
      return this.infoRoute
    }
  }
}
</script>

<style lang="scss">
    .register {
        @include flex();
        &__header {
            margin-bottom: $margin-lg;
        }
        .form-unit {
            @include flex(null, null, column);
            margin-bottom: $margin-md;
            width: 100%;
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
                &__login {
                    color: $pink;
                }
            }
            &__alt {
                @include flex(null, center, column);
                margin-top: $margin-md;
                hr {
                    height: 1px;
                    background-color: $light-blue;
                    border: 0;
                    width: 100%;
                    margin: $margin-sm 0;
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
                        @include transition;
                    }
                }
            }
        }
    }
    .left-side {
        width: 40%;
        height: 100vh;
        background: url('../assets/images/banner.jpg') no-repeat;
        background-position: center center;
        background-size: cover;
        .bg-overlay {
            width: 100%;
            height: 100%;
            background: $dark-blue;
            opacity: $opacity-high;
        }
    }
    .right-side {
        @include flex(center, center, column);
        width: 60%;
        background: url('../assets/images/pattern.svg') no-repeat;
    }
</style>
