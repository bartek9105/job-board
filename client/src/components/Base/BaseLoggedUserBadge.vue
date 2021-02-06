<template>
  <div class="logged-user">
    <BaseCompanyLogo
      :avatar-url="getUserInfo.avatarUrl"
      :img-width="40"
      :img-height="40"
      class="logged-user__avatar"
    />
    {{ loggedInUserName }}
    <font-awesome-icon icon="sort-down" class="logged-user__icon" />
  </div>
</template>

<script>
import BaseCompanyLogo from '@/components/Base/BaseCompanyLogo'
import { mapGetters } from 'vuex'

export default {
  name: 'BaseLoggedUserBadge',
  components: {
    BaseCompanyLogo
  },
  props: {
    loggedInUserName: String
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>

<style lang="scss">
.logged-user {
  @include flex(null, center);
  &__avatar {
    width: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  &__icon {
    margin-top: -5px;
    margin-left: 0.5rem;
  }
}
</style>
