<template>
  <div class="price-card">
    <div class="price-card__header">
      <span class="price-card__header__title">
        <slot name="header"></slot>
      </span>
    </div>
    <div class="content-container">
      <span class="price-card__price">
        <slot name="price"></slot>
      </span>
      <div class="price-card__content">
        <slot name="content"></slot>
      </div>
    </div>
    <Button>Pick</Button>
  </div>
</template>

<script>
import Button from '@/components/Base/Button'

export default {
  name: 'PriceCard',
  components: {
    Button
  }
}
</script>

<style lang="scss">
  .price-card {
    @include shadow;
    background: #fff;
    border-radius: 5px;
    padding-bottom: 50px;
    text-align: center;
    width: 330px;
    color: $theme-dark-blue;
    &__header {
      @include shadow;
      background: $theme-pink;
      border-radius: 5px;
      color: #fff;
      padding: 35px 0;
      &__title {
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
      }
    }
    &__price {
      font-size: 17px;
      font-weight: 700;
    }
    &__content {
      margin-top: 50px;
    }
    .content-container {
      padding: 50px;
      text-align: center;
    }
  }
</style>
