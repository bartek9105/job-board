<template>
    <div class="register">
        <div class="left-side">
            <div class="bg-overlay"></div>
        </div>
        <div class="right-side">
            <h1 class="register__header">Register</h1>
            <form @submit.prevent class="register__form">
                <div class="form-unit">
                    <label for="email" class="register__form__label">E-mail</label>
                    <input type="email" name="email">
                </div>
                <div class="form-unit">
                    <label for="password" class="register__form__label">Password</label>
                    <input type="password" name="password">
                </div>
                <span class="register__form__info">
                    Already have an account?
                    <router-link to="/login" class="register__form__info__login">Login</router-link>
                </span>
                <router-link to="/">
                    <Button>Register</Button>
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Base/Button'

export default {
  name: 'Register',
  components: {
    Button
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
                font-size: $font-content-md;
                font-weight: $font-bold;
                margin-bottom: $margin-md;
                &__login {
                    color: $pink;
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
