<template>
  <Auth>
    <template #header>
      <h1>Login</h1>
    </template>
    <template #form>
      <form @submit.prevent="login">
        <div>
          <div>
            <label for="email">E-mail</label>
            <input
              id="email"
              v-model="credentials.email"
              type="text"
              name="email"
              placeholder="E-mail"
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <div class="info">
            <span>Don't have an account?</span>
            <router-link to="/register">
              Register
            </router-link>
            <span>Forgot your password?</span>
            <router-link to="/passwordforgot">
              Reset password
            </router-link>
          </div>
        </div>
        <BaseButton>Login</BaseButton>
      </form>
    </template>
  </Auth>
</template>

<script>
import Auth from '@/components/Forms/AuthForm'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Auth
  },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['signIn']),
    login() {
      this.signIn(this.credentials)
    }
  }
}
</script>
