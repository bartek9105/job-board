<template>
  <div class="editor">
    <vue-editor
      :value="value"
      :editor-toolbar="customToolbar"
      @input="$emit('input', $event)"
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
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
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
