<template>
  <div class="company-item">
    <section class="company-item__logo">
      <BaseCompanyLogo
        :avatar-url="company.avatarUrl"
        :img-width="124"
        :img-height="124"
      />
    </section>
    <section class="company-item__content">
      <div class="top-content">
        <div class="top-content-title">
          <h3 class="company-item__content__name">
            {{ company.name }}
          </h3>
          <span class="company-item__content__industry">
            {{ company.industry }}
          </span>
        </div>
        <span class="company-item__content__location">
          <font-awesome-icon
            icon="map-marker-alt"
            class="company-item__content__icon"
          />
          {{ company.location }}
        </span>
      </div>
    </section>
    <section class="company-item__additional">
      <button class="btn">
        More info
      </button>
      <span class="company-item__additional__jobs">
        <font-awesome-icon
          icon="briefcase"
          class="company-item__content__icon"
        />
        20 jobs offers
      </span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BaseCompanyItem',
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
  background-color: $white;
  border-radius: 3px;
  color: $dark-blue-light;
  font-size: $font-content-md;
  padding-top: $padding-sm;
  &:hover {
    @include shadow-hover;
    cursor: pointer;
  }
  &__logo {
    width: 124px;
    height: 124px;
    margin: 0 auto $margin-md auto;
  }
  &__content {
    border-bottom: 1px solid $dark-blue-lighter;
    padding: 0 $padding-md;
    .top-content {
      @include flex(space-between, center);
      margin-bottom: $margin-md;
    }
    .top-content-title {
      @include flex(null, center);
    }
    &__name {
      margin-right: 0.75rem;
    }
    &__icon {
      margin-right: 0.5rem;
      color: $dark-blue-lighter;
    }
    &__location {
      color: $dark-blue;
    }
  }
  &__additional {
    @include flex(space-between, center);
    padding: $padding-sm $padding-md;
    &__jobs {
      color: $dark-blue;
    }
  }
  .btn {
    background-color: $light-blue;
    border-radius: $border-radius-btn;
    padding: $padding-xsm $padding-sm;
    font-weight: $font-regular-bold;
    font-size: $font-content-sm;
  }
}
</style>
