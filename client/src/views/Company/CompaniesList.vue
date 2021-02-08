<template>
  <div>Companies List</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CompaniesList',
  methods: {
    ...mapActions(['fetchUsers'])
  },
  computed: {
    ...mapGetters(['getUsers'])
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style lang="scss"></style>
