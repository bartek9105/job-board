<template>
  <div class="logged-user">
    <BaseCompanyLogo
      :avatar-url="userInfo.avatarUrl"
      :img-width="40"
      :img-height="40"
      class="logged-user__avatar"
    />
    <chevron-down-icon size="1.25x" class="logged-user__icon" />
  </div>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons'

export default {
  name: 'BaseLoggedUserBadge',
  components: {
    ChevronDownIcon
  },
  props: {
    userInfo: Object
  }
}
</script>

<style lang="scss">
.logged-user {
  color: $white;
  @include flex(null, center);
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem !important;
  }
  &__icon {
    margin-top: -5px;
    margin-left: 0.5rem;
  }
}
</style>
