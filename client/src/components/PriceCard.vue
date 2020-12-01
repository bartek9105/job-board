<template>
  <div class="price-card">
    <div class="price-card__header">
      <span class="price-card__header__title">
        <slot name="header"></slot>
      </span>
    </div>
    <div class="content-container">
      <span class="price-card__price-meta">
        $
        <span class="price-card__price">
          <slot name="price"></slot>
        </span>
        /month
      </span>
      <div class="price-card__content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PriceCard'
}
</script>

<style lang="scss">
  .price-card {
    background: $white;
    border-radius: $border-radius-sm;
    text-align: center;
    width: 300px;
    color: $dark-blue;
    border-top: 5px solid transparent;
    &:hover {
      @include shadow;
      @include transition;
      cursor: pointer;
      border-top: 5px solid $dark-blue;
    }
    &__header {
      border-bottom: 5px solid $bg-grey;
      padding: $main-content-pd-tb-md 0;
      &__title {
        @include flex-col;
        font-size: $font-content-lg;
        font-weight: $font-bold;
        text-transform: uppercase;
        &__icon {
          font-size: 25px;
          margin-bottom: $section-m-sm;
        }
      }
    }
    .content-container {
      padding: $main-content-pd-tb-md 30px;
      text-align: center;
    }
    &__price {
      font-size: 26px;
      font-weight: $font-bold;
      margin-right: 5px;
    }
    &__content {
      margin-top: $section-m-lg;
      font-size: 15px;
    }
  }
  .active {
    background: $dark-blue;
    color: $white;
  }
</style>
