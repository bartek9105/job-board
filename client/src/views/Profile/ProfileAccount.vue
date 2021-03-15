<template>
  <div class="dashboard-container">
    <h1>Account</h1>
    <UserInfoForm :user-info="getUserInfo" :save-offer="updateUser" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UserInfoForm from '@/components/Forms/UserInfoForm'

export default {
  name: 'ProfileAccount',
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
.dashboard-container {
  @include shadow;
  background-color: $white;
  border-radius: $border-radius-sm;
  padding: $padding-lg;
  h1 {
    font-weight: $font-semi-bold;
    margin-bottom: $margin-lg;
  }
}
</style>
