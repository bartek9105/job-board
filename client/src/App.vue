<template>
  <div id="app">
    <NavMobile v-if="isNavMenuOpened && isMedium" @navMenuOpen="navMenu" />
    <router-view />
    <TheFooter v-if="!isLoginOrRegister" />
  </div>
</template>

<script>
import NavMobile from '@/components/Mobile/NavMobile'
import TheFooter from '@/components/TheFooter'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavMobile,
    TheFooter
  },
  data() {
    return {
      isNavMenuOpened: false
    }
  },
  computed: {
    ...mapGetters(['isMedium']),
    isLoginOrRegister() {
      return (
        this.$route.name === 'Login' ||
        this.$route.name === 'Register' ||
        this.$route.name === 'PasswordReset' ||
        this.$route.name === 'PasswordForgot' ||
        this.$route.name === 'NotFound' ||
        this.$route.name === 'OfferPost' ||
        this.$route.name === 'Profile'
      )
    }
  },
  methods: {
    navMenu(isOpened) {
      this.isNavMenuOpened = isOpened
    }
  }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0.5em;
}
::-webkit-scrollbar-thumb {
  background-color: $dark-blue;
  border-radius: $border-radius-sm;
}
</style>
