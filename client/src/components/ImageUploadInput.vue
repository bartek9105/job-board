<template>
  <vue-dropzone
    id="dropzone"
    ref="myVueDropzone"
    :options="dropzoneOptions"
    :use-custom-slot="true"
    @vdropzone-file-added="getFile"
  >
    <div class="upload-message">
      <upload-cloud-icon size="1.5x" class="upload-message__icon" /> Drop avatar
      here to upload
    </div>
  </vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { UploadCloudIcon } from 'vue-feather-icons'

export default {
  name: 'ImageUploadInput',
  components: {
    vueDropzone: vue2Dropzone,
    UploadCloudIcon
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 0.5,
        addRemoveLinks: true
      }
    }
  },
  methods: {
    getFile(file) {
      this.$emit('file', file)
    }
  }
}
</script>

<style lang="scss">
.vue-dropzone {
  width: 100%;
  padding: $padding-sm;
  .dz-preview {
    width: 100%;
    margin: 0;
    .dz-remove {
      width: 50%;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .dz-details {
      background-color: $dark-blue;
      opacity: 0;
    }
    .dz-image {
      @include flex(center);
      padding: $padding-sm;
    }
  }
}
.upload-message {
  @include flex(null, center);
  &__icon {
    margin-right: 1rem;
  }
}
.dropzone.dz-clickable {
  @include flex(center, center);
}
</style>
