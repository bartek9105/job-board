<template>
  <div class="job-form-container">
    <form @submit.prevent>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Title</span>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|max"
          class="job-form-unit-validator"
        >
          <input
            v-model="offer.title"
            type="text"
            class="job-form-unit__input"
            placeholder="Title"
          />
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Location</span>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <input
            v-model="offer.location"
            type="text"
            class="job-form-unit__input"
            placeholder="City"
            :disabled="locationCheck"
            @change="emitLocation"
          />
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="checkbox-container">
          <input type="checkbox" class="job-form-unit__checkbox" />
          <span class="job-form-unit__checkbox__text">Remote</span>
          <input
            v-model="locationCheck"
            type="checkbox"
            class="job-form-unit__checkbox"
          />
          <span class="job-form-unit__checkbox__text"
            >Same as company headquarters address</span
          >
        </div>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Category</span>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <select
            v-model="offer.category"
            name="category"
            class="job-form-unit__input"
          >
            <option value="Frontend">
              Frontend
            </option>
            <option value="Backend">
              Backend
            </option>
            <option value="UX/UI">
              UI/UX
            </option>
            <option value="Devops">
              DevOps
            </option>
            <option value="Data Science">
              Data Science
            </option>
            <option value="Testing">
              Testing
            </option>
            <option value="PM">
              PM
            </option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Seniority</span>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <select
            v-model="offer.seniority"
            name="type"
            class="job-form-unit__input"
          >
            <option value="Intern">
              Intern
            </option>
            <option value="Junior">
              Junior
            </option>
            <option value="Regular">
              Regular
            </option>
            <option value="Senior">
              Senior
            </option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Salary</span>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <input
            v-model="offer.salaryMin"
            type="number"
            placeholder="MIN"
            class="job-form-unit__input job-form-unit__input--salary"
          />
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <input
            v-model="offer.salaryMax"
            type="number"
            placeholder="MAX"
            class="job-form-unit__input job-form-unit__input--salary"
          />
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Technologies</span>
        <TagInput @technologies="tagsTechnologies" />
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Type</span>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <select v-model="offer.type" name="type" class="job-form-unit__input">
            <option value="Full Time">
              Full Time
            </option>
            <option value="Part Time">
              Part Time
            </option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Contract</span>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <select
            v-model="offer.contract"
            name="type"
            class="job-form-unit__input"
          >
            <option value="B2B">
              B2B
            </option>
            <option value="Employment contract">
              Employment contract
            </option>
            <option value="Mandatory contract">
              Mandatory contract
            </option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="job-form-unit-validator"
        >
          <span class="job-form-unit__name">Description</span>
          <Editor @editorContent="description" />
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-price-cards-container">
        <PriceCard
          v-for="(product, index) in getProducts"
          :key="product._id"
          :class="{ cardActive: activeIndex === index }"
          class="job-form-price-card"
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
            <ul class="job-form-price-card__list">
              <li>
                <i class="fas fa-check job-form-price-card__list__icon" />
                Your offer will last for {{ product.duration }}
              </li>
              <li v-if="product.promotion">
                <i class="fas fa-check job-form-price-card__list__icon" />
                Your offer will be promoted for {{ product.promotion }}
              </li>
            </ul>
            <p class="job-form-price-card__description">
              {{ product.description }}
            </p>
          </template>
        </PriceCard>
      </div>
      <div class="btn-container">
        <stripe-checkout ref="checkoutRef" :pk="key" :session-id="getSessionId">
          <template slot="checkout-button">
            <Button class="add-btn" @click.native="saveOffer">
              {{ btnText }}
            </Button>
            <ClearBtn @click.native="offer = {}">
              Clear form
            </ClearBtn>
          </template>
        </stripe-checkout>
      </div>
    </form>
  </div>
</template>

<script>
import TagInput from '@/components/TagInput'
import Editor from '@/components/Editor'
import Button from '@/components/Base/Button'
import ClearBtn from '@/components/Base/ClearBtn'
import PriceCard from '@/components/PriceCard'
import { StripeCheckout } from 'vue-stripe-checkout'
import { ValidationProvider } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OfferForm',
  components: {
    TagInput,
    Editor,
    Button,
    ClearBtn,
    PriceCard,
    StripeCheckout,
    ValidationProvider
  },
  props: {
    offer: Object,
    saveOffer: Function,
    btnText: String
  },
  data() {
    return {
      locationCheck: false,
      key: process.env.VUE_APP_STRIPE_PUBLISHABLE,
      activeIndex: 1
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    emitLocation() {
      this.$emit('location', this.offer.location)
    },
    tagsTechnologies(techs) {
      this.offer.technologies = techs
    },
    description(content) {
      this.offer.description = content
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getSessionId'])
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style lang="scss">
.job-form-container {
  width: 100%;
  margin: $margin-center;
  background: $white;
  padding: $padding-md 0;
  .job-form-unit {
    @include flex(null, null, column);
    padding: 0 20px;
    margin-bottom: $margin-md;
    &__name {
      @include input-name;
      margin-bottom: $margin-sm;
    }
    &__input {
      &--salary {
        width: 20%;
      }
    }
    &__error {
      font-size: $font-content-sm;
      margin-top: $margin-sm;
      color: $error;
    }
    &-validator {
      @include flex(null, null, column);
    }
    .checkbox-container {
      @include flex(null, center);
      margin-bottom: $margin-sm;
    }
    &__checkbox {
      margin-right: 10px;
      &__text {
        font-size: $font-content-sm;
        margin-right: 13px;
      }
    }
  }
  .btn-container {
    padding: $padding-md 0 0 2rem;
  }
  .add-btn {
    margin-right: 1rem;
  }
  .cardActive {
    background: $dark-blue;
    color: $white;
  }
  .job-form-price-cards-container {
    @include flex(space-between);
    background: $bg-grey;
    padding: $padding-lg 0;
  }
  .job-form-price-card {
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
      line-height: $article-line-height;
    }
  }
}
</style>
