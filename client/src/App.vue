<template>
  <div id="app">
    <router-view />
    <Footer v-if="!isLoginOrRegister" />
  </div>
</template>

<script>
import Footer from '@/components/TheFooter'

export default {
  components: {
    Footer
  },
  computed: {
    isLoginOrRegister() {
      return this.$route.name === 'Login' || this.$route.name === 'Register'
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
