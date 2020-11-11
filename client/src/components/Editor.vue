<template>
  <div class="editor">
    <vue-editor :editorToolbar="customToolbar" v-model="content" @text-change="emitEditorContent"/>
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
      customToolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }]],
      content: ''
    }
  },
  methods: {
    emitEditorContent () {
      this.$emit('editorContent', this.content)
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
