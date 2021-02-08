<template>
  <div class="company-item">
    <BaseCompanyLogo
      :avatar-url="company.avatarUrl"
      img-width="250"
      img-height="200"
    />
    <div class="company-item__description">
      <h3 class="company-item__description__company-name">
        {{ company.name }}
      </h3>
      <div class="company-item__description__info">
        <font-awesome-icon
          icon="industry"
          class="company-item__description__info__icon"
        />
        <span>{{ company.industry }}</span>
      </div>
      <div class="company-item__description__info">
        <font-awesome-icon
          icon="user"
          class="company-item__description__info__icon"
        />
        <span>{{ company.size }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCompanyLogo from '@/components/Base/BaseCompanyLogo'

export default {
  name: 'BaseCompanyItem',
  components: {
    BaseCompanyLogo
  },
  props: {
    company: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.company-item {
  @include shadow;
  max-width: 300px;
  background-color: $white;
  &:hover {
    @include shadow-hover;
    cursor: pointer;
  }
  &__description {
    padding: $padding-sm;
    &__company-name {
      margin-bottom: $margin-sm;
    }
    &__info {
      font-size: $font-content-lg;
      margin-bottom: $margin-xsm;
      &__icon {
        margin-right: 1rem;
      }
    }
  }
}
</style>
