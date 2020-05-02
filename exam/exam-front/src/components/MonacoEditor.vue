<template>
  <div id="editor"></div>
</template>

<script lang='ts'>
  import Vue, { PropOptions } from 'vue';
  import * as monaco from 'monaco-editor';
  import { editor } from 'monaco-editor';
  import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
  import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

  export default Vue.extend({
    name: 'MonacoEditor',
    model: {
      event: 'change',
    },
    props: {
      original: String,
      value: {
        type: String,
        required: true,
      } as PropOptions,
      theme: {
        type: String,
        default: 'vs-dark',
      } as PropOptions,
      language: String,
      options: {
        type: Object,
      } as PropOptions<IStandaloneEditorConstructionOptions>,
      readonly: Boolean,
      enableTrack: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      options: {
        deep: true,
        handler(options) {
          if (this.editor) {
            const { editor } = this;
            editor.updateOptions(options);
          }
        },
      },

      value(newValue) {
        if (this.editor) {
          const { editor } = this;
          if (newValue !== editor.getValue()) {
            editor.setValue(newValue);
          }
        }
      },

      language(newVal) {
        if (this.editor) {
          const { editor } = this;
          this.monaco.editor.setModelLanguage(editor.getModel()!, newVal);
        }
      },

      theme(newVal) {
        if (this.editor) {
          this.monaco.editor.setTheme(newVal);
        }
      },
    },
    mounted() {
      this.monaco = monaco;
      this.initMonaco();
    },

    beforeDestroy() {
      this.editor && this.editor.dispose();
    },
    methods: {
      initMonaco() {
        const self = this;
        self.$emit('editorWillMount', self.monaco);

        const options: IStandaloneEditorConstructionOptions = {
          value: self.value,
          theme: self.theme,
          language: self.language,
          automaticLayout: true,
        };
        Object.assign(options, self.options);

        self.editor = monaco.editor.create(document.getElementById('editor')!, options);

        // @event `change`
        if (!options.readOnly) {
          const { editor } = self;
          editor.onDidPaste(event => {
            // self.$emit('onDidPaste', event);
            const value = editor.getValue();
            if (self.enableTrack)
              this.$socket.client.emit('MonacoEditor', JSON.stringify({
                type: 'onDidPaste',
                value: value,
                event: event,
                time: self.lastTime,
              }));
          });
          editor.onDidChangeModelContent(event => {
            const value = editor.getValue();
            if (self.value !== value) {
              self.$emit('change', value, event);
              if (self.enableTrack) {
                self.lastTime = String(new Date().getTime());
                this.$socket.client.emit('MonacoEditor', JSON.stringify({
                  type: 'onDidChangeModelContent',
                  value: value,
                  event: event,
                  time: self.lastTime,
                }));
              }
            }
          });
        }
        self.$emit('editorDidMount', self.editor);
      },

      getEditor() {
        return this.editor;
      },

      focus() {
        this.editor.focus();
      },
    },
    // render(h) {
    //   return h('div');
    // },
    data() {
      return {
        editor: {} as IStandaloneCodeEditor,
        monaco: monaco,
        lastTime: '',
      };
    },
  });
</script>

<style scoped>
</style>
