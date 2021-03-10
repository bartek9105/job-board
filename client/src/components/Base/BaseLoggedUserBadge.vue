<template>
  <div class="logged-user">
    <BaseCompanyLogo
      :avatar-url="getUserInfo.avatarUrl"
      :img-width="40"
      :img-height="40"
      class="logged-user__avatar"
    />
    {{ loggedInUserName }}
    <chevron-down-icon size="1.25x" class="logged-user__icon" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ChevronDownIcon } from 'vue-feather-icons'

export default {
  name: 'BaseLoggedUserBadge',
  components: {
    ChevronDownIcon
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
    height: 40px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  &__icon {
    margin-top: -5px;
    margin-left: 0.5rem;
  }
}
</style>
