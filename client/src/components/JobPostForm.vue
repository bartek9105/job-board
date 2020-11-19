<template>
  <div>
    <div class="job-post-container">
      <form @submit.prevent>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Title</span>
          <input type="text" class="job-post__input" placeholder="Title" v-model="offer.title">
        </div>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Location</span>
          <input type="text" class="job-post__input" placeholder="City" :disabled="locationCheck" v-model="offer.location" @change="emitLocation">
          <div class="checkbox-container">
            <input type="checkbox" class="job-post__location-checkbox">
            <span class="job-post__location-text">Remote</span>
            <input type="checkbox" class="job-post__location-checkbox" v-model="locationCheck">
            <span class="job-post__location-text">Same as company headquarters address</span>
          </div>
        </div>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Category</span>
          <select name="category" class="job-post__input" v-model="offer.category">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="UX/UI">UI/UX</option>
            <option value="Devops">DevOps</option>
            <option value="Data Science">Data Science</option>
            <option value="Testing">Testing</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Seniority</span>
          <select name="type" class="job-post__input" v-model="offer.seniority">
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Regular">Regular</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Salary</span>
          <div class="job-post__salary-input-container">
            <input type="number" placeholder='MIN' class="job-post__input job-post__input--salary" v-model="offer.salaryMin">
            <input type="number" placeholder='MAX' class="job-post__input job-post__input--salary" v-model="offer.salaryMax">
          </div>
        </div>
        <div class="job-post-input-container">
          <TagInput @technologies="tagsTechnologies"/>
        </div>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Type</span>
          <select name="type" class="job-post__input" v-model="offer.type">
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Contract</span>
          <select name="type" class="job-post__input" v-model="offer.contract">
            <option value="B2B">B2B</option>
            <option value="Employment contract">Employment contract</option>
            <option value="Mandatory contract">Mandatory contract</option>
          </select>
        </div>
        <div class="job-post-input-container">
          <span class="job-post__input-name">Description</span>
          <Editor @editorContent="description"/>
        </div>
        <div class="job-post-price-cards">
          <PriceCard v-for="product in getProducts" :key="product._id" :productId="product._id" @click.native="offer.productId = product._id">
            <template v-slot:header>{{ product.name }}</template>
            <template v-slot:price>{{ product.price / 100 }}</template>
            <template v-slot:content>
              <ul class="job-post-price-cards__list">
                <li>
                  <i class="fas fa-check job-post-price-cards__list__icon"></i>
                  Your offer will last for {{ product.duration }}
                </li>
                <li v-if="product.promotion">
                  <i class="fas fa-check job-post-price-cards__list__icon"></i>
                  Your offer will be promoted for {{ product.promotion }}
                </li>
              </ul>
              <p class="job-post-price-cards__description">{{ product.description }}</p>
            </template>
          </PriceCard>
          <stripe-checkout
            ref="checkoutRef"
            :pk=key
            :session-id=getSessionId
          >
          </stripe-checkout>
        </div>
        <div class="btn-container">
          <Button @click.native="postOffer">Add offer</Button>
          <ClearBtn>Clear inputs</ClearBtn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TagInput from '@/components/TagInput'
import Editor from '@/components/Editor'
import Button from '@/components/Base/Button'
import ClearBtn from '@/components/Base/ClearBtn'
import PriceCard from '@/components/PriceCard'
import { StripeCheckout } from 'vue-stripe-checkout'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'JobPostForm',
  components: {
    TagInput,
    Editor,
    Button,
    ClearBtn,
    PriceCard,
    StripeCheckout
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
      key: process.env.VUE_APP_STRIPE_PUBLISHABLE
    }
  },
  methods: {
    ...mapActions(['postJobOffer', 'fetchProducts', 'createPaymentSession']),
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
      this.createPaymentSession(this.offer).then(() => {
        this.$refs.checkoutRef.redirectToCheckout()
      })
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
  .job-post-container {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 40px 0;
    .job-post-price-cards {
      @include flex-s-b;
      margin: 50px 0;
      padding: 40px 0;
      background: $bg-grey;
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
    .job-post-input-container {
      padding: 0 20px;
      @include flex-col;
      .checkbox-container {
        margin-bottom: 40px;
        display: flex;
        align-items: center;
      }
      .job-post {
        &__input {
          @include input;
          margin-bottom: 40px;
          &--salary {
            margin-right: 30px;
          }
        }
        &__input-name {
          @include input-name;
          margin-bottom: 20px;
        }
        &__location-checkbox {
          margin-right: 10px;
        }
        &__location-text {
          font-size: 13px;
          margin-right: 10px;
        }
        &__salary-input-container {
          display: flex;
        }
      }
    }
    .btn-container {
      padding: 0 20px;
    }
  }
</style>
