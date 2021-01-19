<template>
  <div>
    <BaseHero />
    <div class="user-settings-container">
      <h1>Add info about your company</h1>
      <div class="user-settings">
        <form @submit.prevent>
          <div class="user-settings__form-unit">
            <span class="user-settings__form-unit__name"
              >Upload company logo
            </span>
            <input type="file" />
          </div>
          <div class="user-settings__form-unit">
            <span class="user-settings__form-unit__name">Company size</span>
            <input type="text" placeholder="Size" />
          </div>
          <div class="user-settings__form-unit">
            <span class="user-settings__form-unit__name">Location</span>
            <input type="text" placeholder="Location" />
          </div>

          <div class="user-settings__form-unit">
            <span class="user-settings__form-unit__name">Industry</span>
            <input type="text" placeholder="Industry" />
          </div>
          <div class="user-settings__form-unit">
            <span class="user-settings__form-unit__name">
              Company stack
              <TagInput :list-items="getTechnologies" />
            </span>
          </div>
          <div class="user-settings__form-unit">
            <span class="user-settings__form-unit__name">About you</span>
            <TextEditor />
          </div>
          <div class="btn-container">
            <BaseButton class="add-btn">
              Save
            </BaseButton>
            <BaseClearButton>Clear form</BaseClearButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseHero from '@/components/Base/BaseHero'
import TextEditor from '@/components/TextEditor'
import TagInput from '@/components/TagInput'
import BaseButton from '@/components/Base/Buttons/BaseButton'
import BaseClearButton from '@/components/Base/Buttons/BaseClearButton'
export default {
  name: 'UserSettings',
  components: {
    BaseHero,
    TextEditor,
    TagInput,
    BaseButton,
    BaseClearButton
  },
  computed: {
    ...mapGetters(['getTechnologies'])
  }
}
</script>

<style lang="scss" scoped>
.user-settings-container {
  width: 100%;
  background-color: $bg-grey;
}
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
