<template>
  <div>
    <BaseHero />
    <div class="company-items-container">
      <div class="company-items">
        <div v-for="company in getUsers" :key="company._id">
          <BaseCompanyItem :company="company" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseCompanyItem from '@/components/Base/BaseCompanyItem'
import BaseHero from '@/components/Base/BaseHero'

export default {
  name: 'CompaniesList',
  components: {
    BaseCompanyItem,
    BaseHero
  },
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

<style lang="scss">
.company-items-container {
  width: 100%;
  background: $bg-grey;
  padding: $padding-lg 0;
}
.company-items {
  max-width: $container-width;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}
</style>
