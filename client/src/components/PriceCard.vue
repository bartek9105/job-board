<template>
  <div class="price-card">
    <div class="price-card__header">
      <span class="price-card__header__title">
        <slot name="header" />
      </span>
    </div>
    <div class="content-container">
      <span class="price-card__price-meta">
        $
        <span class="price-card__price">
          <slot name="price" />
        </span>
        /month
      </span>
      <div class="price-card__content">
        <slot name="content" />
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
    padding: $padding-md 0;
    &__title {
      @include flex(null, null, column);
      font-size: $font-content-lg;
      font-weight: $font-bold;
      text-transform: uppercase;
    }
  }
  .content-container {
    padding: $padding-lg 30px;
    text-align: center;
  }
  &__price {
    font-size: $font-content-xl;
    font-weight: $font-bold;
    margin-right: 5px;
  }
  &__content {
    margin-top: $margin-lg;
    font-size: $font-content-lg;
  }
}
.active {
  background: $dark-blue;
  color: $white;
}
</style>
