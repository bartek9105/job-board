<template>
  <div>
    <div class="job-post-container">
      <form @submit.prevent>
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
          <TagInput/>
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
          <Editor/>
        </div>
        <div class="btn-container">
          <Button>Add offer</Button>
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

export default {
  name: 'JobPostForm',
  components: {
    TagInput,
    Editor,
    Button,
    ClearBtn
  },
  data () {
    return {
      offer: {
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
      locationCheck: false
    }
  },
  methods: {
    emitLocation () {
      this.$emit('location', this.offer.location)
    }
  }
}
</script>

<style lang="scss">
  .job-post-container {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 40px 20px;
    .job-post-input-container {
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
      margin-top: 30px;
    }
  }
</style>
