<template>
  <div class="social-share">
    <share-2-icon
      size="1.25x"
      class="share-icon"
      @click="showList = !showList"
    />
    <ul v-if="showList" class="socials-list">
      <li>
        <ShareNetwork network="facebook" :url="url" :title="title">
          <font-awesome-icon
            :icon="['fab', 'facebook']"
            class="socials-list__icon"
          />
          <span class="socials-list__text">Share on Facebook</span>
        </ShareNetwork>
      </li>
      <li>
        <ShareNetwork network="twitter" :url="url" :title="title">
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="socials-list__icon"
          />
          <span class="socials-list__text">Share on Twitter</span>
        </ShareNetwork>
      </li>
      <li>
        <ShareNetwork network="linkedin" :url="url" :title="title">
          <font-awesome-icon
            :icon="['fab', 'linkedin']"
            class="socials-list__icon"
          />
          <span class="socials-list__text">Share on Linkedin</span>
        </ShareNetwork>
      </li>
    </ul>
  </div>
</template>

<script>
import { Share2Icon } from 'vue-feather-icons'

export default {
  name: 'SocialShare',
  components: {
    Share2Icon
  },
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showList: false
    }
  }
}
</script>

<style lang="scss" scoped>
.social-share {
  position: relative;
}
.share-icon {
  cursor: pointer;
  &:hover {
    color: $dark-blue-hover;
  }
}
.socials-list {
  @include shadow;
  width: 200px;
  position: absolute;
  top: 2rem;
  right: 0;
  z-index: 1;
  border-radius: $border-radius-sm;
  li {
    color: $white;
    padding: $padding-sm;
    background-color: $dark-blue;
    &:hover {
      background-color: $dark-blue-hover;
      cursor: pointer;
    }
  }
  &__icon {
    color: $white;
    font-size: $font-icon-sm;
    margin-right: 1rem;
  }
  &__text {
    color: $white;
  }
}
</style>
