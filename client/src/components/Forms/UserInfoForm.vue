<template>
  <div class="user-settings">
    <form @submit.prevent>
      <div class="user-settings__form-unit">
        <span class="user-settings__form-unit__name">Upload company logo </span>
        <ImageUploadInput @file="avatarFile" />
      </div>
      <div class="user-settings__form-unit">
        <span class="user-settings__form-unit__name">Company size</span>
        <input v-model="userInfo.size" type="number" placeholder="Size" />
      </div>
      <div class="user-settings__form-unit">
        <span class="user-settings__form-unit__name">Location</span>
        <input v-model="userInfo.location" type="text" placeholder="Location" />
      </div>
      <div class="user-settings__form-unit">
        <span class="user-settings__form-unit__name">Industry</span>
        <input v-model="userInfo.industry" type="text" placeholder="Industry" />
      </div>
      <div class="user-settings__form-unit">
        <span class="user-settings__form-unit__name">
          Company stack
          <TagInput :list-items="technologies" @items="tagsTechnologies" />
        </span>
      </div>
      <div class="user-settings__form-unit">
        <span class="user-settings__form-unit__name">About you</span>
        <TextEditor v-model="userInfo.about" />
      </div>
      <div class="btn-container">
        <BaseButton class="add-btn" @click.native="saveOffer">
          Save
        </BaseButton>
        <BaseClearButton>Clear form</BaseClearButton>
      </div>
    </form>
  </div>
</template>

<script>
import TextEditor from '@/components/TextEditor'
import TagInput from '@/components/TagInput'
import ImageUploadInput from '@/components/ImageUploadInput'
import technologies from '@/constants/technologies'

export default {
  name: 'UserInfoForm',
  components: {
    TextEditor,
    TagInput,
    ImageUploadInput
  },
  props: {
    userInfo: Object,
    saveOffer: Function
  },
  data() {
    return {
      avatar: null
    }
  },
  created() {
    this.technologies = technologies
  },
  methods: {
    tagsTechnologies(technologies) {
      this.userInfo.technologies = technologies
    },
    avatarFile(avatar) {
      this.userInfo.avatar = avatar
    }
  }
}
</script>

<style lang="scss" scoped>
.user-settings {
  max-width: $container-width;
  margin: 0 auto;
  background-color: $white;
  padding: $padding-md 0;
  &__form-unit {
    @include flex(null, null, column);
    padding: 0 $padding-md;
    margin-bottom: $margin-md;
    &__name {
      @include input-name;
      margin-bottom: $margin-sm;
    }
  }
}
.btn-container {
  padding: $padding-md 0 0 2rem;
  .add-btn {
    margin-right: 1rem;
  }
}
</style>
