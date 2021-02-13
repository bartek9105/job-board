<template>
  <div>
    <BaseHero />
    <Container>
      <h1>Add info about your company</h1>
      <UserInfoForm :user-info="getUserInfo" :save-offer="updateUser" />
      <Container />
    </Container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserInfoForm from '@/components/Forms/UserInfoForm'

export default {
  name: 'UserSettings',
  components: {
    UserInfoForm
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    updateUser() {
      this.updateUserInfo(this.getUserInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: $margin-md;
}
</style>
