<template>
  <v-container>
    <MonacoEditor v-model="text" language="java"></MonacoEditor>
    <v-divider/>
    <v-btn @click="p1" color="primary">提交</v-btn>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import MonacoEditor from '~/components/MonacoEditor.vue';
  import { AnswerControllerApi, Question, QuestionControllerApi, TemplateControllerApi } from '~/generated/openapi';
  import { apiConfig } from '~/api-config';

  function preventRefresh(ev: { preventDefault: () => void; returnValue: string; }) {
    ev.preventDefault();
    ev.returnValue = '';
  }

  export default Vue.extend({
    name: 'index.vue',
    components: {
      MonacoEditor,
    },
    async created() {
      if (this.$route.query.q !== undefined) {
        this.question = await new QuestionControllerApi(apiConfig)
          .questionControllerFindById(Number(this.$route.query.q)).then(v => v.data);
        if (this.question.templateName !== undefined)
          this.text = (await new TemplateControllerApi(apiConfig)
            .templateControllerFindById(this.question.templateName).then(v => v.data)).content;
        this.$socket.client.emit('editor/create');
      }
    },
    data() {
      return {
        text: '',
        question: {} as Question,
        n: String(this.$route.query.n),
        submitting: false,
      };
    },
    sockets: {
      async onSuccess(dat) {
        this.$toast.success('提交成功,answerID:' + dat);
        await this.$router.push('/quests');
      },
    },
    methods: {
      async p1() {
        if (this.n.startsWith('-')) {
          await new TemplateControllerApi(apiConfig)
            .templateControllerCreate({
              name: this.n.substring(1),
              content: this.text,
            });
          this.$toast.success('模板创建成功');
          this.submitting = true;
          await this.$router.push('/admin');
        }

        const api = new AnswerControllerApi(apiConfig);
        const answer = await api.answerControllerCreate({
          user: this.$auth.user.sub,
          content: this.text,
          question: this.question.id!,
        }).then(v => v.data);
        this.submitting = true;
        this.$socket.client.emit('editor/submit', answer.id);
      },
    },
    beforeMount() {
      window.addEventListener('beforeunload', preventRefresh);
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
  #editor {
    width: 100%;
    height: 90vh;
  }
</style>
