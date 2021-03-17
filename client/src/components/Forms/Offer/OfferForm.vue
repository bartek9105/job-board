<template>
  <div class="job-form-container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <FormInputValidator
          v-model="offer.title"
          placeholder="Title"
          rules="required"
        />
        <FormInputValidator
          v-model="offer.location.address"
          placeholder="Address"
          rules="required"
        />
        <FormInputValidator
          v-model="offer.location.city"
          placeholder="City"
          rules="required"
        />
        <FormInputValidator
          v-model="offer.location.country"
          placeholder="Country"
          rules="required"
        />
        <FormSelectValidator
          :option-values="offerDetails.CATEGORIES"
          name="category"
          label="Category"
          @selectedValue="getSelectedValue"
        />
        <FormSelectValidator
          :option-values="offerDetails.SENIORITIES"
          name="seniority"
          label="Seniority"
          @selectedValue="getSelectedValue"
        />
        <div class="job-form-unit">
          <div class="job-form-unit__row-salary">
            <div class="job-form-unit__row__col">
              <span class="job-form-unit__name">Salary (monthly)</span>
              {{ offer.salary.salaryMin }} -
              {{ offer.salary.salaryMax }}
              <BaseSalaryRangeSlider
                class="salary-range-slider"
                :salary-min="offer.salary.salaryMin"
                :salary-max="offer.salary.salaryMax"
                @salaryRange="salary"
              />
            </div>
            <FormSelectValidator
              :option-values="offerDetails.CURRENCIES"
              name="currency"
              label="Currency"
              @selectedValue="getSelectedValue"
            />
          </div>
        </div>
        <div class="job-form-unit">
          <span class="job-form-unit__name">Main technology</span>
          <ValidationProvider
            v-slot="{ errors }"
            ref="technologyProvider"
            rules="arrayEmpty"
            class="job-form-unit-validator"
          >
            <TagInput
              v-model="offer.mainTechnology.name"
              :tag-items="offer.technologies"
              :list-items="technologies"
              :is-single="true"
              @items="tagMainTechnology"
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
        <FormSelectValidator
          :option-values="offerDetails.TYPES"
          name="type"
          label="Type"
          @selectedValue="getSelectedValue"
        />
        <FormSelectValidator
          :option-values="offerDetails.CONTRACTS"
          name="contract"
          label="Contract"
          @selectedValue="getSelectedValue"
        />
        <FormInputValidator
          v-model="offer.applyURL"
          placeholder="Apply URL"
          rules="required"
        />
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
            >{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <BaseOfferPreviewPanel
          v-if="displayOfferPreview"
          :title="offer.title"
          subtitle="Offer Preview"
        >
          <BaseButton
            class="add-btn"
            @click.native="onSubmit"
          >
            {{ btnText }}
          </BaseButton>
          <BaseClearButton @click.native="offerPreview">
            Offer preview
          </BaseClearButton>
        </BaseOfferPreviewPanel>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import TagInput from '@/components/TagInput'
import TextEditor from '@/components/TextEditor'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import offerDetails from '@/constants/offerDetails'
import technologies from '@/constants/technologies'
import benefits from '@/constants/benefits'
import BaseSalaryRangeSlider from '@/components/Base/BaseSalaryRangeSlider'
import BaseOfferPreviewPanel from '@/components/Base/Offer/BaseOfferPreviewPanel'
import FormInputValidator from '@/components/Forms/Offer/FormInputValidator'
import FormSelectValidator from '@/components/Forms/Offer/FormSelectValidator'

export default {
  name: 'OfferForm',
  components: {
    TagInput,
    TextEditor,
    ValidationObserver,
    ValidationProvider,
    BaseSalaryRangeSlider,
    BaseOfferPreviewPanel,
    FormInputValidator,
    FormSelectValidator
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
      isValid: null,
      scroll: 0
    }
  },
  methods: {
    ...mapActions(['fetchProducts']),
    onSubmit() {
      this.saveOffer()
      if (!this.offer.isPreview) {
        localStorage.removeItem('offer')
      }
    },
    offerPreview() {
      this.offer.isPreview = true
      localStorage.setItem('offer', JSON.stringify(this.offer))
      this.onSubmit()
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
    tagMainTechnology(technology) {
      this.offer.mainTechnology = technology[0]
      this.$refs.technologyProvider.reset()
    },
    tagsBenefits(benefits) {
      this.offer.benefits = benefits
      this.$refs.benefitProvider.reset()
    },
    getSelectedValue(value, name) {
      this.offer[name] = value
    },
    getSalaryCurrency(value, name) {
      this.offer.salary.currency = value
    },
    salary(salary) {
      const [salaryMin, salaryMax] = salary
      this.offer.salary.salaryMin = salaryMin
      this.offer.salary.salaryMax = salaryMax
    },
    handleScroll() {
      this.scroll = window.scrollY
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getSessionId']),
    isArrayNotEmpty() {
      return this.offer.technologies.length > 0
    },
    displayOfferPreview() {
      return this.scroll >= 900
    }
  },
  mounted() {
    this.fetchProducts()
  },
  created() {
    this.offerDetails = offerDetails
    this.technologies = technologies
    this.benefits = benefits
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss">
.job-form-container {
  @include shadow;
  border-radius: $border-radius-sm;
  width: 100%;
  margin: $margin-center;
  background: $white;
  padding: $padding-md 0;
  .offer-add {
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: white;
    padding: $padding-md;
    width: 100%;
    &__details {
      @include flex(space-between, center);
      max-width: $container-width;
      margin: $margin-center;
    }
  }
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
    &__row {
      @include flex(space-between, center);
      &__col {
        @include flex(null, null, column);
        width: 100%;
        margin-right: 1rem;
      }
      &__input {
        position: relative;
        margin-right: 1rem;
      }
    }
    &__row-salary {
      display: grid;
      grid-template-columns: 70% 30%;
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
      margin: $margin-md $margin-md 0 0;
    }
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
