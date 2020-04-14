<template>
  <v-container>
    <ValidationObserver v-slot="{handleSubmit}">
      <v-form @submit.prevent="handleSubmit(submit)">
        <v-card width="100%" style="margin-bottom: 10px" :disabled="loading" :loading="loading">
          <v-card-title>
            <ValidationProvider class="vp" v-slot="{ errors }" name="标题" rules="required">
              <v-text-field
                v-model="question.title"
                prepend-inner-icon="mdi-card-bulleted"
                label="标题"
                :error-messages="errors"
                outlined color="primary"/>
            </ValidationProvider>
          </v-card-title>
          <v-card-subtitle>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="question.score"
                  label="分值"
                  prepend-inner-icon="mdi-align-vertical-bottom"
                  :disabled="!enabled('score')"
                  outlined/>
              </v-col>
              <v-col>
                <v-text-field
                  prepend-inner-icon="mdi-account-edit"
                  v-model="question.author"
                  label="命题人"
                  :disabled="!enabled('author')"
                  outlined/>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col :cols="preview?6:12">
                <v-textarea
                  v-model="question.brief"
                  label="题目简述"
                  :disabled="!enabled('brief')"
                  append-icon="mdi-language-markdown"
                  auto-grow
                  counter
                  outlined>
                </v-textarea>
              </v-col>
              <v-col v-if="preview" cols="6">
                <div class="md" v-html="Renderer(question.brief)"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="preview?6:12">
                <ValidationProvider class="vp" v-slot="{ errors }" name="详情" rules="required">
                  <v-textarea
                    v-model="question.detail"
                    label="题目详情"
                    append-icon="mdi-language-markdown"
                    :error-messages="errors"
                    auto-grow counter outlined/>
                </ValidationProvider>
              </v-col>
              <v-col v-if="preview" cols="6">
                <div class="md" v-html="Renderer(question.detail)"/>
              </v-col>
            </v-row>
            <!--        <v-row>-->
            <!--          <v-col v-if="preview?6:12">-->
            <!--            <v-textarea-->
            <!--              :disabled="!enabled('限制')"-->
            <!--              label="限制"-->
            <!--              append-icon="mdi-language-markdown"-->
            <!--              outlined/>-->
            <!--          </v-col>-->
            <!--          <v-col v-if="preview" cols="6">-->
            <!--            <div class="md" v-html="Renderer(question.detail)"/>-->
            <!--          </v-col>-->
            <!--        </v-row>-->
            <div>
              <v-divider style="padding-bottom: 10px"/>
              <v-row>
                <v-col>
                  <v-btn
                    @click="addExample()"
                    x-large style="margin-right: 10px">
                    <v-icon color="primary">mdi-plus-box</v-icon>
                    <span>添加示例</span>
                  </v-btn>
                </v-col>

                <v-col>
                  <v-select
                    :items="templates.map(v=>v.name)"
                    v-model="question.templateName"
                    label="答题模板"
                    outlined
                  />
                </v-col>
              </v-row>
              <div style="padding-top: 12px"
                   v-if="question.examples.length!==0"
                   v-for="(item,i) in question.examples"
                   :key="i">
                <v-row style="margin: 0">
                  <v-col style="padding: 0 12px">
                    示例{{i+1}}
                    <v-btn icon @click="removeExample(i)">
                      <v-icon color="error">mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" sm="12" style="padding: 0 12px">
                    <v-textarea
                      v-model="item.input"
                      label="输入"
                      clearable
                      auto-grow
                      outlined/>
                  </v-col>
                  <v-col cols="12" md="6" sm="12" style="padding: 0 12px">
                    <v-textarea v-model="item.output" label="输出" clearable auto-grow outlined/>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn x-large type="submit" color="primary">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { getModule } from 'vuex-module-decorators';
  import { DefaultLayoutSettings } from '~/store/DefaultLayoutSettings';
  import { OptionPanel } from '~/store/OptionPanel';
  import { QuestionControllerApi, Template, TemplateControllerApi } from '~/generated/openapi';
  import { Renderer } from 'vuetify-markdown-editor';
  import { required } from 'vee-validate/dist/rules';
  import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
  import { apiConfig } from '~/api-config';
  import { Quest, Quests } from '~/store/Quests';

  setInteractionMode('eager');
  extend('required', {
    ...required,
    message: '{_field_} 不能为空',
  });

  const panelOptions = [
    { title: '分值', enabled: true, field: 'score' },
    { title: '命题人', enabled: true, field: 'author' },
    { title: '简述', enabled: true, field: 'brief' },
    { title: 'Markdown预览', enabled: false, field: 'preview' },
  ];

  function preventRefresh(ev: { preventDefault: () => void; returnValue: string; }) {
    ev.preventDefault();
    ev.returnValue = '';
  }

  export default Vue.extend({
    name: 'edit',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    async created() {
      const self = this;
      await getModule(OptionPanel, self.$store).setOptions(panelOptions);
      await getModule(DefaultLayoutSettings, self.$store)
        .setLeftPanelType('option', {
          icon: 'mdi-cog',
          show: true,
        });
      if (self.$route.query.edit) {
        self.mode = 'edit';
        const id = Number(self.$route.query.id);
        const qModule = getModule(Quests, self.$store);
        await qModule.fetchOne(id);
        const q = qModule.getQuest(id)!;
        self.question = { ...q };
        //examples prop is a brunch of object, so we have to copy them one by one
        self.question.examples = []; //re-init the array
        q.examples?.forEach(value => {
          self.question.examples!.push({ ...value });
        });
      }
      self.templates = await new TemplateControllerApi(apiConfig)
        .templateControllerFind().then(v => v.data);
      self.loading = false;
    },
    computed: {
      enabled() {
        return (field: string) => getModule(OptionPanel, this.$store).getOption(field)?.enabled;
      },
      preview() {
        return getModule(OptionPanel, this.$store).getOption('preview')?.enabled;
      },
    },
    data() {
      return {
        question: {
          examples: [],
          title: '',
          detail: '',
        } as Quest,
        Renderer: Renderer,
        loading: true,
        mode: 'add',
        templates: [] as Template[],
        submitting: false,
      };
    },
    methods: {
      addExample() {
        this.question.examples?.push({ input: '', output: '' });
      },
      removeExample: function(i: number) {
        this.question.examples?.splice(i, 1);
      },
      async submit() {
        this.loading = true;
        const { question } = this;
        const overrider: { [key: string]: undefined } = {};
        panelOptions.filter(v => !v.enabled).forEach(v => {
          if (v.field in question)
            overrider[v.field] = undefined;
        });
        Object.keys(question).forEach(k => {
          if (question[k] == null)
            overrider[k] = undefined;
        });
        Object.assign(question, overrider);
        const u = new QuestionControllerApi(apiConfig);
        let q = undefined;
        this.submitting = true;
        switch (this.mode) {
          case 'add':
            q = await u.questionControllerCreate(question).then(value => value.data);
            await this.$router.push(`/quests/${q.id}`);
            break;
          case 'edit':
            q = u.questionControllerReplaceById(question.id!, question).then(v => v.data);
            await this.$router.push(`/quests/${question.id}`);
            break;
        }
        this.loading = false;
      },
    },
    beforeMount() {
      window.addEventListener('beforeunload',preventRefresh );
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('beforeunload', preventRefresh);
      });
    },
    beforeRouteLeave(to, from, next) {
      if (!this.submitting && !window.confirm('Leave without saving?')) return;
      window.removeEventListener('beforeunload', preventRefresh);
      next();
    },

  });
</script>

<style scoped>
  .col {
    padding: 0 12px
  }

  .vp {
    width: 100%;
  }
</style>
