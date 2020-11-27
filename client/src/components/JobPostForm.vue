<template>
  <div class="job-form-container">
    <form @submit.prevent>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Title</span>
        <ValidationProvider rules="required|max" v-slot="{ errors }" class="job-form-unit-validator">
          <input type="text" class="job-form-unit__input" placeholder="Title" v-model="offer.title">
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Location</span>
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <input type="text" class="job-form-unit__input" placeholder="City" :disabled="locationCheck" v-model="offer.location" @change="emitLocation">
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="checkbox-container">
          <input type="checkbox" class="job-form-unit__checkbox">
          <span class="job-form-unit__checkbox__text">Remote</span>
          <input type="checkbox" class="job-form-unit__checkbox" v-model="locationCheck">
          <span class="job-form-unit__checkbox__text">Same as company headquarters address</span>
        </div>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Category</span>
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <select name="category" class="job-form-unit__input" v-model="offer.category">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UX/UI">UI/UX</option>
            <option value="Devops">DevOps</option>
            <option value="Data Science">Data Science</option>
            <option value="Testing">Testing</option>
            <option value="PM">PM</option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Seniority</span>
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <select name="type" class="job-form-unit__input" v-model="offer.seniority">
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Regular">Regular</option>
            <option value="Senior">Senior</option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Salary</span>
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <input type="number" placeholder='MIN' class="job-form-unit__input job-form-unit__input--salary" v-model="offer.salaryMin">
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <input type="number" placeholder='MAX' class="job-form-unit__input job-form-unit__input--salary" v-model="offer.salaryMax">
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <TagInput @technologies="tagsTechnologies"/>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Type</span>
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <select name="type" class="job-form-unit__input" v-model="offer.type">
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <span class="job-form-unit__name">Contract</span>
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <select name="type" class="job-form-unit__input" v-model="offer.contract">
            <option value="B2B">B2B</option>
            <option value="Employment contract">Employment contract</option>
            <option value="Mandatory contract">Mandatory contract</option>
          </select>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-unit">
        <ValidationProvider rules="required" v-slot="{ errors }" class="job-form-unit-validator">
          <span class="job-form-unit__name">Description</span>
          <Editor @editorContent="description"/>
          <span class="job-form-unit__error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="job-form-price-cards-container">
        <PriceCard v-for="(product, index) in getProducts" :key="product._id" @click.native="offer.productId = product._id, activeIndex = index" :class="{ cardActive: activeIndex === index }" class="job-form-price-card">
          <template v-slot:header>{{ product.name }}</template>
          <template v-slot:price>{{ product.price / 100 }}</template>
          <template v-slot:content>
            <ul class="job-form-price-card__list">
              <li>
                <i class="fas fa-check job-form-price-card__list__icon"></i>
                Your offer will last for {{ product.duration }}
              </li>
              <li v-if="product.promotion">
                <i class="fas fa-check job-form-price-card__list__icon"></i>
                Your offer will be promoted for {{ product.promotion }}
              </li>
            </ul>
            <p class="job-form-price-card__description">{{ product.description }}</p>
          </template>
        </PriceCard>
      </div>
      <div class="btn-container">
        <stripe-checkout
          ref="checkoutRef"
          :pk=key
          :session-id=getSessionId
        >
          <template slot="checkout-button">
            <Button @click.native="postOffer">Add offer</Button>
            <ClearBtn @click.native="offer = {}">Clear inputs</ClearBtn>
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
  name: 'JobPostForm',
  components: {
    TagInput,
    Editor,
    Button,
    ClearBtn,
    PriceCard,
    StripeCheckout,
    ValidationProvider
  },
  data () {
    return {
      offer: {
        productId: '',
        title: '',
        technologies: [],
        location: '',
        category: '',
        seniority: '',
        salaryMin: null,
        salaryMax: null,
        type: '',
        contract: '',
        description: ''
      },
      locationCheck: false,
      key: process.env.VUE_APP_STRIPE_PUBLISHABLE,
      activeIndex: 1
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'addJobOffer']),
    emitLocation () {
      this.$emit('location', this.offer.location)
    },
    tagsTechnologies (techs) {
      this.offer.technologies = techs
    },
    description (content) {
      this.offer.description = content
    },
    postOffer () {
      if (this.getProducts.price === 0) {
        this.addJobOffer(this.offer)
      } else {
        this.addJobOffer(this.offer).then(() => {
          this.$refs.checkoutRef.redirectToCheckout()
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getSessionId'])
  },
  mounted () {
    this.fetchProducts()
  }
}
</script>

<style lang="scss">
  .job-form-container {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 40px 0;
    .job-form-unit {
      @include flex-col;
      padding: 0 20px;
      margin-bottom: 10px;
      &__name {
        @include input-name;
        margin-bottom: 15px;
      }
      &__input {
        @include input;
      }
      &__error {
        font-size: 13px;
        margin: 20px 0;
        color: red;
      }
      &-validator {
        @include flex-col;
      }
      .checkbox-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      &__checkbox {
        margin-right: 10px;
        &__text {
          font-size: 13px;
          margin-right: 13px;
        }
      }
    }
    .btn-container {
      padding: 0 20px;
    }
    .cardActive {
      background: $theme-dark-blue;
      color: #fff;
    }
    .job-form-price-cards-container {
      @include flex-s-b;
      background: $bg-grey;
      margin: 50px 0;
      padding: 40px 0;
    }
    .job-form-price-card {
      &__list {
        list-style: none;
        text-align: left;
        li {
          display: flex;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 30px;
        }
        &__icon {
          margin-right: 10px;
        }
      }
      &__description {
        font-size: 13px;
        line-height: 24px;
      }
    }
  }
</style>
