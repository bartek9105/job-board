<template>
  <Auth>
    <template #header>
      <h1>Reset Password</h1>
    </template>
    <template #form>
      <form @submit.prevent="resetPassword">
        <div>
          <div>
            <label for="email">E-mail</label>
            <input
              id="email"
              v-model="email"
              type="text"
              name="email"
              placeholder="E-mail"
            />
          </div>
          <div class="info">
            <router-link to="/login">
              Login
            </router-link>
            <router-link to="/register">
              Register
            </router-link>
          </div>
        </div>
        <BaseButton type="submit">
          Reset password
        </BaseButton>
      </form>
    </template>
  </Auth>
</template>

<script>
import { mapActions } from 'vuex'
import Auth from '@/components/Forms/AuthForm'

export default {
  name: 'PasswordForgot',
  components: {
    Auth
  },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    ...mapActions(['reset']),
    resetPassword() {
      this.reset(this.email)
    }
  }
}
</script>

<style></style>
