<template>
  <div id="app">
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  components: {
    Footer
  }
}
</script>

<style lang="scss">
  ul::-webkit-scrollbar {
    width: 0.5em;
  }
  ul::-webkit-scrollbar-thumb {
    background-color: $theme-dark-blue;
    border-radius: 5px;
  }
</style>
