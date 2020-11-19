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
    background: #fff;
    border-radius: 5px;
    padding-bottom: 50px;
    text-align: center;
    width: 300px;
    color: $theme-dark-blue;
    border-top: 5px solid transparent;
    &:hover {
      @include shadow;
      @include transition;
      cursor: pointer;
      border-top: 5px solid $theme-dark-blue;
    }
    &__header {
      border-bottom: 5px solid $bg-grey;
      color: $theme-dark-blue;
      padding: 25px 0;
      &__title {
        @include flex-col;
        font-size: 17px;
        font-weight: 700;
        text-transform: uppercase;
        &__icon {
          font-size: 25px;
          margin-bottom: 20px;
        }
      }
    }
    .content-container {
      padding: 30px;
      text-align: center;
    }
    &__price {
      font-size: 26px;
      font-weight: 700;
      margin-right: 5px;
    }
    &__content {
      margin-top: 50px;
      font-size: 15px;
    }
  }
  .active {
    background: $theme-dark-blue;
    color: #fff;
  }
</style>
