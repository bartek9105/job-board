<template>
  <div>
    <div
      v-if="avatarUrl"
      class="company-logo-container"
      :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
    >
      <img
        v-show="isImageLoaded"
        :src="avatarUrl"
        alt="logo"
        class="company-logo"
        @load="loaded"
      />
      <div v-show="!isImageLoaded" class="skeleton" />
    </div>
    <div
      v-else
      class="company-logo-container"
      :style="{ width: imgWidth + 'px', height: imgHeight + 'px' }"
    >
      <home-icon size="1.5x" class="company-building-logo" />
    </div>
  </div>
</template>

<script>
import { HomeIcon } from 'vue-feather-icons'

export default {
  name: 'BaseCompanyLogo',
  components: {
    HomeIcon
  },
  props: {
    avatarUrl: {
      type: String,
      default: () => ''
    },
    imgWidth: Number,
    imgHeight: Number
  },
  data() {
    return {
      isImageLoaded: false
    }
  },
  methods: {
    loaded() {
      this.isImageLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.company-logo-container {
  @include flex(center, center);
  background-color: $white;
  border-radius: 5px;
  padding: 0.4rem;
  overflow: hidden;
}
.company-logo {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.company-building-logo {
  width: 100%;
  height: auto;
  color: $light-blue;
}

.skeleton {
  @include shadow();
  border-radius: $border-radius-sm;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      $dark-blue-lighter 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      left: -150px;
    }
    to {
      left: 100%;
    }
  }
}
</style>
