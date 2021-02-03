<template>
  <vue-dropzone id="dropzone" ref="myVueDropzone" :options="dropzoneOptions" />
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'ImageUploadInput',
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 0.5,
        addRemoveLinks: true
      }
    }
  }
}
</script>

<style lang="scss">
.dropzone {
  width: 200px;
  padding: 0;
  .dz-preview {
    width: 100%;
    margin: 0;
    .dz-remove {
      width: 90%;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .dz-details {
      background-color: $dark-blue;
      opacity: 0;
    }
  }
}
</style>
