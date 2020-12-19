<template>
  <div class="editor">
    <vue-editor
      v-model="content"
      :editor-toolbar="customToolbar"
      @text-change="emitEditorContent"
    />
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Editor',
  components: {
    VueEditor
  },
  data() {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ],
      content: ''
    }
  },
  methods: {
    emitEditorContent() {
      this.$emit('editorContent', this.content)
    }
  }
}
</script>

<style lang="scss">
.editor {
  max-width: $container-width;
}
.ql-toolbar.ql-snow {
  margin-bottom: $margin-sm;
}
.ql-snow {
  @include input-select-border;
}
</style>
