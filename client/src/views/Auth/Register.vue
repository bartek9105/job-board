<template>
  <Auth>
    <template #header>
      <h1>Register</h1>
    </template>
    <template #form>
      <form @submit.prevent="signUp">
        <div>
          <div>
            <label for="company">Company name</label>
            <input
              id="company"
              v-model="credentials.name"
              type="text"
              name="company"
              placeholder="Company name"
            />
          </div>
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
            <span>Already registered?</span>
            <router-link to="/login">
              Login
            </router-link>
            <span>Forgot your password?</span>
            <router-link to="/passwordforgot">
              Reset password
            </router-link>
          </div>
        </div>
        <BaseButton type="submit">
          Register
        </BaseButton>
      </form>
    </template>
  </Auth>
</template>

<script>
import Auth from '@/components/Forms/AuthForm'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
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
    ...mapActions(['register']),
    signUp() {
      this.register(this.credentials)
    }
  }
}
</script>
