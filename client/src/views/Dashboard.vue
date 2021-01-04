<template>
  <div>
    <Navbar />
    <h1>Dashboard view</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from '@/components/Navbar'
export default {
  name: 'Dashboard',
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(['getOffersByUser'])
  },
  mounted() {
    this.fetchOffersByUser()
  },
  methods: {
    ...mapActions(['fetchOffersByUser'])
  }
}
</script>

<style lang="scss"></style>
