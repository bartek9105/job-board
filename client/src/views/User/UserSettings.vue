<template>
  <div>
    <BaseHero />
    <div class="user-settings-container">
      <h1>Add info about your company</h1>
      <UserInfoForm :user-info="getUserInfo" :save-offer="updateUser" />
    </div>
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
  mounted() {
    this.fetchUserInfo()
  },
  methods: {
    ...mapActions(['updateUserInfo', 'fetchUserInfo']),
    updateUser() {
      this.updateUserInfo(this.getUserInfo)
    }
  }
}
</script>

<style lang="scss">
.user-settings-container {
  width: 100%;
}
</style>
