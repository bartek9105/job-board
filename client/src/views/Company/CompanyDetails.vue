<template>
  <BaseHero>
    <template v-slot:hero-content>
      <div class="company-logo">
        <BaseCompanyLogo
          :avatar-url="getUser.avatarUrl"
          :img-width="100"
          :img-height="100"
        />
      </div>
    </template>
  </BaseHero>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseHero from '@/components/Base/BaseHero'
import BaseCompanyLogo from '@/components/Base/BaseCompanyLogo'

export default {
  name: 'CompanyDetails',
  components: {
    BaseHero,
    BaseCompanyLogo
  },
  methods: {
    ...mapActions(['fetchUser'])
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created() {
    this.fetchUser(this.$route.params.id)
  }
}
</script>

<style></style>
