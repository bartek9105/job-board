<template>
  <Auth infoRoute="/register" @email="email" @password="password">
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
      <Button @click.native="login">Login</Button>
    </template>
  </Auth>
</template>

<script>
import Auth from '@/components/Auth'
import Button from '@/components/Base/Button'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Auth,
    Button
  },
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['signIn']),
    login () {
      this.signIn(this.credentials)
    },
    email (emailData) {
      this.credentials.email = emailData
    },
    password (passwordData) {
      this.credentials.password = passwordData
    }
  }
}
</script>

<style>

</style>
