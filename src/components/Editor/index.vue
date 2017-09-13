<template>
  <div class="editor">
    <mavon-editor :style="editorStyle" :toolbars="toolbars" :subfield="false" @save="handleSave" :default_open='defaultOpen' :toolbarsFlag='toolbarsFlag' :value='value' :placeholder='placeholder' @change='handleChange'></mavon-editor>
  </div>
</template>

<script>
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'editor',
  data() {
    return {
      toolbars: {
        imagelink: true,
        save: true,
        preview: true,
        bold: true,
        italic: true,
      },
      editorStyle: {
        height: "100%",
      }
    }
  },
  props: {
    isRead: {
      type: Boolean,
      default: false,
    },
    value: String,
    placeholder: String,
  },
  computed: {
    defaultOpen() {
      if (this.isRead) {
        return 'preview';
      }
      return 'edit';
    },
    toolbarsFlag() {
      return !this.isRead;
    }
  },
  components: {
    'mavon-editor': mavonEditor.mavonEditor
  },
  methods: {
    handleSave(val, render) {
      this.$emit('save', val, render);
    },
    handleChange(val, render) {
      this.$emit('change', val, render);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .editor {
    flex: 1;
    overflow: auto;
  }
  .v-note-op {
    height: 80px;
  }
  .editor .v-note-wrapper .v-note-op .left {
    padding-left: 12px;
  }
  .editor .v-note-wrapper .v-note-op .right {
    padding-right: 12px;
  }
  .editor .v-note-wrapper .v-note-op .left .op-icon, .editor .v-note-wrapper .v-note-op .right .op-icon {
    height: 56px;
    width: 56px;
    margin: 12px 0 10px 10px;
    font-size: 30px;
    padding: 9px 12px 10px 7px;
  }
  .editor .v-note-wrapper .v-note-op .left .op-icon-divider, .editor .v-note-wrapper .v-note-op .right .op-icon-divider {
    height: 80px;
    border-left: 2px solid #e5e5e5;
    margin: 0 12px 0 8px;
  }
  .editor .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
    padding: 16px 50px 30px 50px;
    height: 100%;
  }
  .editor .auto-textarea-wrapper .auto-textarea-input.no-resize {
    font-size: 30px !important;
    height: 100%;
    overflow: auto;
  }
  .editor .auto-textarea-wrapper .auto-textarea-block {
    height: 100%;
  }
  .editor .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .editor .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background-color: #fff;
    padding: 16px 50px 30px 50px;
    font-size: 30px;
  }
  .editor .v-note-wrapper .v-note-panel .v-note-show .v-show-content, p {
    line-height: 40px;
    color: #000;
  }
  .code-github .hljs {
    overflow: auto;
  }
</style>
