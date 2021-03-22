<template>
  <div class="form-container">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)" @keydown.enter.prevent>
        <FormInputValidator
          v-model="offer.title"
          placeholder="Title"
          rules="required|maxTitle"
          class="form-unit"
        />
        <div class="location-unit">
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
        </div>
        <div class="grid-unit">
          <FormSelectValidator
            :option-values="offerDetails.CATEGORIES"
            name="category"
            label="Category"
            rules="required"
            class="form-unit"
            :selected="offer.category"
            @valueChange="getSelectedValue"
          />
          <FormSelectValidator
            v-model="offer.seniority"
            :option-values="offerDetails.SENIORITIES"
            name="seniority"
            label="Seniority"
            rules="required"
            class="form-unit"
            :selected="offer.seniority"
            @valueChange="getSelectedValue"
          />
        </div>
        <div class="form-unit salary-unit">
          <BaseSalaryRangeSlider
            :salary-min="offer.salary.salaryMin"
            :salary-max="offer.salary.salaryMax"
            title="Salary"
            @salaryRange="salary"
          />
          <FormSelectValidator
            :option-values="offerDetails.CURRENCIES"
            name="currency"
            label="Currency"
            rules="required"
            :selected="offer.salary.currency"
            @valueChange="getSalaryCurrency"
          />
        </div>
        <FormTagsInputValidator
          :list-items="technologies"
          class="form-unit"
          label="Main technology"
          :is-single="true"
          @items="tagMainTechnology"
        />
        <FormTagsInputValidator
          :list-items="technologies"
          :selected="offer.technologies"
          class="form-unit"
          label="Technologies"
          @items="tagsTechnologies"
        />
        <div class="grid-unit">
          <FormSelectValidator
            :option-values="offerDetails.TYPES"
            name="type"
            label="Type"
            rules="required"
            class="form-unit"
            :selected="offer.type"
            @valueChange="getSelectedValue"
          />
          <FormSelectValidator
            :option-values="offerDetails.CONTRACTS"
            name="contract"
            label="Contract"
            rules="required"
            class="form-unit"
            :selected="offer.contract"
            @valueChange="getSelectedValue"
          />
        </div>
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
          :selected="offer.benefits"
          @items="tagsBenefits"
        />
        <FormEditorValidator
          class="form-unit"
          placeholder="Description"
          rules="required|maxDescription"
          :description="offer.description"
          @descriptionValue="descriptionValue"
        />
        <BaseOfferPreviewPanel
          v-if="displayOfferPreview"
          :title="offer.title"
          subtitle="Offer Preview"
        >
          <BaseButton class="add-btn" @click.native="handleSubmit(onSubmit)">
            {{ btnText }}
          </BaseButton>
          <BaseClearButton @click.native="previewMode = true">
            Offer preview
          </BaseClearButton>
        </BaseOfferPreviewPanel>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import offerDetails from '@/constants/offerDetails'
import technologies from '@/constants/technologies'
import benefits from '@/constants/benefits'
import BaseSalaryRangeSlider from '@/components/Base/BaseSalaryRangeSlider'
import BaseOfferPreviewPanel from '@/components/Base/Offer/BaseOfferPreviewPanel'
import FormInputValidator from '@/components/Forms/Offer/FormInputValidator'
import FormSelectValidator from '@/components/Forms/Offer/FormSelectValidator'
import FormTagsInputValidator from '@/components/Forms/Offer/FormTagsInputValidator'
import FormEditorValidator from '@/components/Forms/Offer/FormEditorValidator'

export default {
  name: 'OfferForm',
  components: {
    ValidationObserver,
    BaseSalaryRangeSlider,
    BaseOfferPreviewPanel,
    FormInputValidator,
    FormSelectValidator,
    FormTagsInputValidator,
    FormEditorValidator
  },
  props: {
    offer: Object,
    saveOffer: Function,
    btnText: String
  },
  data() {
    return {
      key: process.env.VUE_APP_STRIPE_PUBLISHABLE,
      scroll: 0,
      previewMode: false
    }
  },
  computed: {
    ...mapGetters(['getProducts', 'getSessionId']),
    displayOfferPreview() {
      return this.scroll >= 300
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll')
  },
  mounted() {
    this.fetchProducts()
  },
  created() {
    this.offerDetails = offerDetails
    this.technologies = technologies
    this.benefits = benefits
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions(['fetchProducts', 'addPreviewOffer']),
    onSubmit() {
      this.previewMode ? this.offerPreview() : this.saveOffer()
    },
    offerPreview() {
      localStorage.setItem('offer', JSON.stringify(this.offer))
      this.addPreviewOffer(this.offer)
      this.$router.push({
        name: 'OfferDetails',
        params: { offerId: this.offer._id, isPreviewMode: true }
      })
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
    descriptionValue(value) {
      this.offer.description = value
    },
    salary(salary) {
      const [salaryMin, salaryMax] = salary
      this.offer.salary.salaryMin = salaryMin
      this.offer.salary.salaryMax = salaryMax
    },
    handleScroll() {
      this.scroll = window.scrollY
    }
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
  margin-bottom: $margin-sm;
}
.salary-unit {
  max-width: 900px;
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  column-gap: 2rem;
}

.location-unit {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
}

.grid-unit {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
}

.add-btn {
  margin-right: 1rem;
}
.cardActive {
  background: $dark-blue;
  color: $white;
}
</style>
