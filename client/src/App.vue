<template>
  <div id="app">
    <NavMobile v-if="isNavMenuOpened" @navMenuOpen="navMenu" />
    <TheNavbar @navMenuOpen="navMenu" />
    <router-view />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import NavMobile from '@/components/Mobile/NavMobile'

export default {
  name: 'App',
  components: {
    TheNavbar,
    NavMobile
  },
  data() {
    return {
      isNavMenuOpened: false
    }
  },
  computed: {
    isLoginOrRegister() {
      return (
        this.$route.name === 'Login' ||
        this.$route.name === 'Register' ||
        this.$route.name === 'NotFound'
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
ul::-webkit-scrollbar {
  width: 0.5em;
}
ul::-webkit-scrollbar-thumb {
  background-color: $dark-blue;
  border-radius: $border-radius-sm;
}
</style>
