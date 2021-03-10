<template>
  <div class="company">
    <BaseCompanyLogo
      :avatar-url="company.avatarUrl"
      :img-width="100"
      :img-height="100"
    />
    <div class="company-details-container">
      <h3 class="company__name">
        {{ company.name }}
      </h3>
      <span>
        <user-icon size="1.25x" class="company__icon" />
        {{ company.size }} people
      </span>
      <span>
        <home-icon size="1.25x" class="company__icon" />
        {{ company.industry }}
      </span>
    </div>
    <BaseButton>More info</BaseButton>
  </div>
</template>

<script>
import { UserIcon, HomeIcon } from 'vue-feather-icons'

export default {
  name: 'BaseCompanyInfo',
  components: {
    UserIcon,
    HomeIcon
  },
  props: {
    company: Object
  }
}
</script>

<style lang="scss" scoped>
.company {
  @include flex(null, center, column);
  &__name {
    font-weight: $font-bold;
    margin-bottom: $margin-sm;
  }
  &__icon {
    margin-right: 0.5rem;
    color: $dark-blue-lighter;
  }
}
.company-details-container {
  @include flex(null, center, column);
  margin-bottom: $margin-md;
}
</style>
