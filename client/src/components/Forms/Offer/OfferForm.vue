<template>
  <div class="job-form-container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="job-form-unit">
          <span class="job-form-unit__name">Title</span>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|maxTitle"
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
          <div class="job-form-unit__location">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="job-form-unit-validator"
            >
              <input
                v-model="offer.location.address"
                type="text"
                class="job-form-unit__input job-form-unit__location__input"
                placeholder="Address"
                :disabled="locationCheck"
              />
              <span class="job-form-unit__error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="job-form-unit-validator"
            >
              <input
                v-model="offer.location.city"
                type="text"
                class="job-form-unit__input job-form-unit__location__input"
                placeholder="City"
                :disabled="locationCheck"
              />
              <span class="job-form-unit__error">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="job-form-unit-validator"
            >
              <input
                v-model="offer.location.country"
                type="text"
                class="job-form-unit__input job-form-unit__location__input"
                placeholder="Country"
                :disabled="locationCheck"
              />
              <span class="job-form-unit__error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="checkbox-container">
            <input
              v-model="offer.isRemote"
              type="checkbox"
              class="job-form-unit__checkbox"
            />
            <span class="job-form-unit__checkbox__text">Remote</span>
            <input
              v-model="offer.isPartlyRemote"
              type="checkbox"
              class="job-form-unit__checkbox"
            />
            <span class="job-form-unit__checkbox__text">Partly remote</span>

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
            <BaseSelect
              v-model="offer.category.name"
              :option-values="offerDetails.CATEGORIES"
              name="category"
              @value-change="getValue"
            />
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
            <BaseSelect
              v-model="offer.seniority"
              :option-values="offerDetails.SENIORITIES"
              name="seniority"
              @value-change="getValue"
            />
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
            {{ offer.salaryMin }} - {{ offer.salaryMax }}
            <BaseSalaryRangeSlider
              v-model="offer.salaryMin"
              class="salary-range-slider"
              :salary-min="offer.salaryMin"
              :salary-max="offer.salaryMax"
              @salaryRange="salary"
            />
            <span class="job-form-unit__error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="job-form-unit">
          <span class="job-form-unit__name">Technologies</span>
          <ValidationProvider
            v-slot="{ errors }"
            ref="technologyProvider"
            rules="arrayEmpty"
            class="job-form-unit-validator"
          >
            <TagInput
              v-model="offer.technologies"
              :tag-items="offer.technologies"
              :list-items="technologies"
              @items="tagsTechnologies"
            />
            <span class="job-form-unit__error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="job-form-unit">
          <span class="job-form-unit__name">Type</span>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="job-form-unit-validator"
          >
            <BaseSelect
              v-model="offer.type"
              :option-values="offerDetails.TYPES"
              name="type"
              @value-change="getValue"
            />

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
            <BaseSelect
              v-model="offer.contract"
              :option-values="offerDetails.CONTRACTS"
              name="contract"
              @value-change="getValue"
            />

            <span class="job-form-unit__error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="job-form-unit">
          <span class="job-form-unit__name">Benefits</span>
          <ValidationProvider
            v-slot="{ errors }"
            ref="benefitProvider"
            rules="arrayEmpty"
            class="job-form-unit-validator"
          >
            <TagInput
              v-model="offer.technologies"
              :tag-items="offer.benefits"
              :list-items="benefits"
              @items="tagsBenefits"
            />
            <span class="job-form-unit__error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="job-form-unit">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|maxDescription"
            class="job-form-unit-validator"
          >
            <span class="job-form-unit__name">Description</span>
            <TextEditor v-model="offer.description" />
            <span
              class="job-form-unit__error job-form-unit__error--description"
              >{{ errors[0] }}</span
            >
          </ValidationProvider>
        </div>
        <div class="btn-container">
          <stripe-checkout
            ref="checkoutRef"
            :pk="key"
            :session-id="getSessionId"
          >
            <template slot="checkout-button">
              <BaseButton class="add-btn" @click="onSubmit">
                {{ btnText }}
              </BaseButton>
              <BaseClearButton @click.native="offer = {}">
                Clear form
              </BaseClearButton>
            </template>
          </stripe-checkout>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import TagInput from '@/components/TagInput'
import TextEditor from '@/components/TextEditor'
import { StripeCheckout } from 'vue-stripe-checkout'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import BaseSelect from '@/components/Base/BaseSelect'
import offerDetails from '@/constants/offerDetails'
import technologies from '@/constants/technologies'
import benefits from '@/constants/benefits'
import BaseSalaryRangeSlider from '@/components/Base/BaseSalaryRangeSlider'

export default {
  name: 'OfferForm',
  components: {
    TagInput,
    TextEditor,
    StripeCheckout,
    ValidationObserver,
    ValidationProvider,
    BaseSelect,
    BaseSalaryRangeSlider
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
      activeIndex: 1,
      isValid: null
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    onSubmit() {
      this.saveOffer()
    },
    emitLocation() {
      this.$emit('location', this.offer.location)
    },
    description(content) {
      this.offer.description = content
    },
    tagsTechnologies(technologies) {
      this.offer.technologies = technologies
      this.$refs.technologyProvider.reset()
    },
    tagsBenefits(benefits) {
      this.offer.benefits = benefits
      this.$refs.benefitProvider.reset()
    },
    getValue(value, name) {
      this.offer[name] = value
    },
    salary(salary) {
      const [salaryMin, salaryMax] = salary
      this.offer.salaryMin = salaryMin
      this.offer.salaryMax = salaryMax
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getSessionId']),
    isArrayNotEmpty() {
      return this.offer.technologies.length > 0
    }
  },
  mounted() {
    this.fetchProducts()
  },
  created() {
    this.offerDetails = offerDetails
    this.technologies = technologies
    this.benefits = benefits
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
    padding: 0 $padding-md;
    margin-bottom: 2.5rem;
    select {
      width: 100%;
    }
    &__name {
      @include input-name;
      margin-bottom: $margin-sm;
    }
    &__error {
      font-size: $font-content-sm;
      color: $error;
      position: absolute;
      top: 45px;
      &--description {
        top: 315px;
      }
    }
    &__location {
      @include flex(space-between, center);
      &__input {
        margin-right: 1rem;
        position: relative;
      }
    }
    &-validator {
      @include flex(null, null, column);
      width: 100%;
      position: relative;
    }
    .checkbox-container {
      @include flex(null, center);
      margin-top: $margin-md;
    }
    &__checkbox {
      margin-right: 10px;
      &__text {
        font-size: $font-content-sm;
        margin-right: 13px;
      }
    }
    .salary-range-slider {
      margin-top: $margin-md;
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
}
</style>
