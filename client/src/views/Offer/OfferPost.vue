<template>
  <div>
    <BaseHero>
      <template v-slot:hero-content>
        <Map :location="location" />
      </template>
    </BaseHero>
    <div class="post-offer-form-container">
      <div class="post-offer-form">
        <h3 class="post-offer-form__heading">
          Post your job offer
        </h3>
        <OfferForm
          :offer="offer"
          :save-offer="saveOffer"
          btn-text="Add offer"
          @location="locationData"
        />
        <div class="price-cards-container">
          <PriceCard
            v-for="(product, index) in getProducts"
            :key="product._id"
            :class="{ cardActive: activeIndex === index }"
            class="post-offer-form__price-card"
            @click.native="
              ;(offer.productId = product._id), (activeIndex = index)
            "
          >
            <template v-slot:header>
              {{ product.name }}
            </template>
            <template v-slot:price>
              {{ product.price / 100 }}
            </template>
            <template v-slot:content>
              <ul class="post-offer-form__price-card__list">
                <li>
                  <i
                    class="fas fa-check post-offer-form__price-card__list__icon"
                  />
                  Your offer will last for {{ product.duration }}
                </li>
                <li v-if="product.promotion">
                  <i
                    class="fas fa-check post-offer-form__price-card__list__icon"
                  />
                  Your offer will be promoted for {{ product.promotion }}
                </li>
              </ul>
              <p class="post-offer-form__price-card__description">
                {{ product.description }}
              </p>
            </template>
          </PriceCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Map from '@/components/Map'
import OfferForm from '@/components/Forms/Offer/OfferForm'
import PriceCard from '@/components/Base/BasePriceCard'

export default {
  name: 'OfferPost',
  components: {
    Map,
    OfferForm,
    PriceCard
  },
  data() {
    return {
      activeIndex: 1,
      location: '',
      offer: {
        technologies: []
      }
    }
  },
  computed: {
    ...mapGetters(['getProducts'])
  },
  methods: {
    ...mapActions(['addOffer']),
    locationData(location) {
      this.location = location
    },
    saveOffer() {
      this.addOffer(this.offer)
    }
  }
}
</script>

<style lang="scss">
.post-offer-form-container {
  padding: $padding-lg 40px;
  .post-offer-form {
    max-width: $container-width;
    margin: $margin-center;
    &__heading {
      margin-bottom: $margin-md;
    }
    &__price-card {
      &__list {
        text-align: left;
        li {
          @include flex();
          font-size: $font-content-md;
          font-weight: $font-bold;
          margin-bottom: $margin-md;
        }
        &__icon {
          margin-right: 10px;
        }
      }
      &__description {
        font-size: $font-content-sm;
        line-height: $line-height-regular;
      }
    }
  }
  .price-cards-container {
    @include flex(space-between);
    margin-top: $margin-md;
  }
}
.cardActive {
  background: $dark-blue;
  color: $white;
}
</style>
