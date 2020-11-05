<template>
  <div class="editor">
    <vue-editor :editorToolbar="customToolbar"/>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Editor',
  components: {
    VueEditor
  },
  data () {
    return {
      customToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }]]
    }
  }
}
</script>

<style>
  .editor {
    max-width: 1087px;
  }
</style>
