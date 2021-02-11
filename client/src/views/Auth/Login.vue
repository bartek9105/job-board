<template>
  <Auth info-route="/register" @email="email" @password="password">
    <template v-slot:header>
      <h1>Login</h1>
    </template>
    <template v-slot:info>
      Don't have an account?
    </template>
    <template v-slot:info-action>
      Register
    </template>
    <template v-slot:btn>
      <BaseButton @click.native="login">
        Login
      </BaseButton>
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
    },
    email(emailData) {
      this.credentials.email = emailData
    },
    password(passwordData) {
      this.credentials.password = passwordData
    }
  }
}
</script>

<style></style>
