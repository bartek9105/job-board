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
