<template>
  <div class="price-card" @click="isActive = !isActive">
    <div class="price-card__header" :class="cardActive">
      <span class="price-card__header__title">
        <i class="fas fa-tools price-card__header__title__icon"></i>
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
    <stripe-checkout
      ref="checkoutRef"
      :pk=key
      :session-id=sessionId
    >
      <template slot="checkout-button">
        <Button @click.native="session">Pick</Button>
      </template>
    </stripe-checkout>
  </div>
</template>

<script>
import Button from '@/components/Base/Button'
import { StripeCheckout } from 'vue-stripe-checkout'
import axios from 'axios'

export default {
  name: 'PriceCard',
  components: {
    Button,
    StripeCheckout
  },
  props: {
    productId: String
  },
  data () {
    return {
      isActive: false,
      key: process.env.VUE_APP_STRIPE_PUBLISHABLE,
      sessionId: ''
    }
  },
  methods: {
    async session () {
      try {
        const response = await axios.post('http://localhost:5000/api/v1/payments', {
          productId: this.productId,
          email: 'example@email.com'
        })
        this.sessionId = response.data.id
        this.$refs.checkoutRef.redirectToCheckout()
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    cardActive () {
      return { active: this.isActive }
    }
  }
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
