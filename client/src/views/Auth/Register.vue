<template>
  <div>
    <Auth info-route="/login" @email="email" @password="password">
      <template v-slot:header>
        <h1>Register</h1>
      </template>
      <template v-slot:info>
        Already have an account?
      </template>
      <template v-slot:info-action>
        Login
      </template>
      <template v-slot:btn>
        <BaseButton @click.native="signUp">
          Register
        </BaseButton>
      </template>
    </Auth>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Auth from '@/components/Forms/AuthForm'

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
