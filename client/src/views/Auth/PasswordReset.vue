<template>
  <Auth>
    <template #header>
      <h1>Set new password</h1>
    </template>
    <template #form>
      <form @submit.prevent="setNewPassword">
        <div>
          <div>
            <label for="password">New Password</label>
            <input
              id="password_new"
              v-model="credentials.newPassword"
              type="password"
              name="password_new"
              placeholder="New Password"
            />
          </div>
          <div>
            <label for="password">Confirm Password</label>
            <input
              id="password_confirm"
              v-model="credentials.confirmPassword"
              type="password"
              name="password_confirm"
              placeholder="Confirm Password"
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
  name: 'PasswordReset',
  components: {
    Auth
  },
  data() {
    return {
      credentials: {
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    ...mapActions(['newPassword']),
    setNewPassword() {
      this.newPassword({
        id: this.$route.query.id,
        token: this.$route.query.token,
        ...this.credentials
      })
    }
  }
}
</script>

<style></style>
