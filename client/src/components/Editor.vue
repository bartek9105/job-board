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

<style lang="scss">
  .editor {
    max-width: 1087px;
  }
  .ql-toolbar.ql-snow {
    margin-bottom: 10px;
  }
  .ql-snow {
    @include input-border;
  }
</style>
