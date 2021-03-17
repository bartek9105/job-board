<template>
  <div class="form-container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <FormInputValidator
          v-model="offer.title"
          placeholder="Title"
          rules="required"
          class="form-unit"
        />
        <FormInputValidator
          v-model="offer.location.address"
          placeholder="Address"
          rules="required"
          class="form-unit"
        />
        <FormInputValidator
          v-model="offer.location.city"
          placeholder="City"
          rules="required"
          class="form-unit"
        />
        <FormInputValidator
          v-model="offer.location.country"
          placeholder="Country"
          rules="required"
          class="form-unit"
        />
        <FormSelectValidator
          :option-values="offerDetails.CATEGORIES"
          name="category"
          label="Category"
          rules="required"
          class="form-unit"
          @selectedValue="getSelectedValue"
        />
        <FormSelectValidator
          :option-values="offerDetails.SENIORITIES"
          name="seniority"
          label="Seniority"
          rules="required"
          class="form-unit"
          @selectedValue="getSelectedValue"
        />
        <div class="form-unit">
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
            rules="required"
            class="form-unit"
            @selectedValue="getSelectedValue"
          />
        </div>
        <FormTagsInputValidator
          :list-items="technologies"
          class="form-unit"
          label="Main technology"
          :is-single="true"
          @items="tagsTechnologies"
        />
        <FormTagsInputValidator
          :list-items="technologies"
          class="form-unit"
          label="Technologies"
          @items="tagsTechnologies"
        />
        <FormSelectValidator
          :option-values="offerDetails.TYPES"
          name="type"
          label="Type"
          rules="required"
          class="form-unit"
          @selectedValue="getSelectedValue"
        />
        <FormSelectValidator
          :option-values="offerDetails.CONTRACTS"
          name="contract"
          label="Contract"
          rules="required"
          class="form-unit"
          @selectedValue="getSelectedValue"
        />
        <FormInputValidator
          v-model="offer.applyURL"
          placeholder="Apply URL"
          rules="required"
          class="form-unit"
        />
        <FormTagsInputValidator
          :list-items="benefits"
          class="form-unit"
          label="Benefits"
          @items="tagsBenefits"
        />
        <div class="form-unit">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|maxDescription"
            class="job-form-unit-validator"
          >
            <label>Description</label>
            <TextEditor v-model="offer.description" />
            <span
              class="job-form-unit__error job-form-unit__error--description"
              >{{ errors[0] }}</span
            >
          </ValidationProvider>
        </div>
        <BaseOfferPreviewPanel
          v-if="displayOfferPreview"
          :title="offer.title"
          subtitle="Offer Preview"
        >
          <BaseButton class="add-btn" @click.native="onSubmit">
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
import FormTagsInputValidator from '@/components/Forms/Offer/FormTagsInputValidator'

export default {
  name: 'OfferForm',
  components: {
    TextEditor,
    ValidationObserver,
    ValidationProvider,
    BaseSalaryRangeSlider,
    BaseOfferPreviewPanel,
    FormInputValidator,
    FormSelectValidator,
    FormTagsInputValidator
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
    onSubmit() {},
    offerPreview() {
      this.offer.isPreview = true
      localStorage.setItem('offer', JSON.stringify(this.offer))
      this.onSubmit()
    },
    description(content) {
      this.offer.description = content
    },
    tagsTechnologies(technologies) {
      this.offer.technologies = technologies
    },
    tagMainTechnology(technology) {
      this.offer.mainTechnology = technology[0]
    },
    tagsBenefits(benefits) {
      this.offer.benefits = benefits
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
      return this.scroll >= 300
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

<style lang="scss" scoped>
.form-container {
  @include shadow;
  border-radius: $border-radius-sm;
  width: 100%;
  margin: $margin-center;
  background: $white;
  padding: $padding-md;
}
.form-unit {
  margin-bottom: 1rem;
}
.add-btn {
  margin-right: 1rem;
}
.cardActive {
  background: $dark-blue;
  color: $white;
}
</style>
