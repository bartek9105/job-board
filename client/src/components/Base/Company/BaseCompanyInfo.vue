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
        <font-awesome-icon icon="user" class="company__icon" />
        {{ company.size }} people
      </span>
      <span>
        <font-awesome-icon icon="industry" class="company__icon" />
        {{ company.industry }}
      </span>
    </div>
    <BaseButton>More info</BaseButton>
  </div>
</template>

<script>
export default {
  name: 'BaseCompanyInfo',
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
  }
}
.company-details-container {
  @include flex(null, center, column);
  margin-bottom: $margin-md;
}
</style>
