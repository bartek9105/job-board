<template>
    <div>
        <Auth infoRoute="/register">
            <template v-slot:header>
                <h1>Login</h1>
            </template>
            <template v-slot:info>
                Don't have an account?
            </template>
            <template v-slot:info-action>
                Register
            </template>
            <template v-slot:btn-text>
                Login
            </template>
        </Auth>
    </div>
</template>

<script>
import Auth from '@/components/Auth'

export default {
  name: 'Login',
  components: {
    Auth
  }
}
</script>

<style>

</style>
