<template>
  <div>
    <Auth infoRoute="/login">
      <template v-slot:header>
        <h1>Register</h1>
      </template>
      <template v-slot:info>
        Already have an account?
      </template>
      <template v-slot:info-action>
        Login
      </template>
      <template v-slot:btn-text>
        Register
      </template>
    </Auth>
  </div>
</template>

<script>
import Auth from '@/components/Auth'

export default {
  name: 'Register',
  components: {
    Auth
  }
}
</script>

<style></style>
