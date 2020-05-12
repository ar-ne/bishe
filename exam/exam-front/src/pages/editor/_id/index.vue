<template>
  <v-container>
    <v-dialog v-model="loading" persistent>
      <v-card>
        <v-card-title>
          等待服务器...
        </v-card-title>
        <v-card-text>
          <v-progress-linear indeterminate/>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card v-if="!loading">
      <v-card-actions>
        <v-btn @click="submit">提交</v-btn>
        <v-btn @click="openEditor">打开编辑器</v-btn>
      </v-card-actions>
      <v-card-text>
        暂无内容
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import MonacoEditor from '~/components/MonacoEditor.vue';
  import {
    Question,
    QuestionControllerApi,
    TemplateControllerApi,
    WorkspaceControllerApi,
    WorkspaceSession,
  } from '~/generated/openapi';
  import { apiConfig } from '~/api-config';

  function preventRefresh(ev: { preventDefault: () => void; returnValue: string; }) {
    ev.preventDefault();
    ev.returnValue = '';
  }

  let workspace: WorkspaceSession;

  export default Vue.extend({
    name: 'index.vue',
    components: {
      MonacoEditor,
    },
    async created() {
      if (this.$route.query.q !== undefined) {//答题模式
        this.question = await new QuestionControllerApi(apiConfig())
          .questionControllerFindById(Number(this.$route.query.q)).then(v => v.data);
        let archive = '';
        if (this.question.templateName)
          archive = await new TemplateControllerApi(apiConfig()).templateControllerFindById(this.question.templateName).then(v => v.data.content);
        this.workspace = await new WorkspaceControllerApi(apiConfig())
          .workspaceControllerGetContainer(this.$auth.getToken('hydra'), true, archive).then(v => v.data);
        this.workMode = 1;
        this.loading = false;
      }
      if (this.$route.query.n !== undefined) { //模板模式
        this.workspace = await new WorkspaceControllerApi(apiConfig())
          .workspaceControllerGetContainer(this.$auth.getToken('hydra'), false).then(v => v.data);
        this.workMode = 2;
        this.loading = false;
      }
      workspace = this.workspace;
    },
    data() {
      return {
        workMode: 0,//0:加载, 1:答题, 2:模板
        question: {} as Question,
        n: String(this.$route.query.n),//模板名称
        workspace: {} as WorkspaceSession,
        loading: true,
      };
    },
    sockets: {
      async answerSuccess(dat) {
        this.$toast['success']('提交成功,回答:' + dat);
        await new WorkspaceControllerApi(apiConfig()).workspaceControllerDeleteById(this.$auth.getToken('hydra'));
        await this.$router.push('/quests');
      },
      async templateSuccess(dat) {
        this.$toast['success']('提交成功,模板:' + dat);
        await new WorkspaceControllerApi(apiConfig()).workspaceControllerDeleteById(this.$auth.getToken('hydra'));
        await this.$router.push('/teacher');
      },
    },
    methods: {
      async openEditor() {
        window.open(`${process.env.VUE_APP_CONTAINER_BASE}/${this.workspace.containerID}/`);
      },
      async submit() {
        switch (this.workMode) {
          case 1:
            this.$socket.client.emit('submit/answer', this.question.id);
            break;
          case 2:
            this.$socket.client.emit('submit/template', this.n);
            break;
        }
      },
    },
  });
</script>

<style scoped>
  #editor {
    width: 100%;
    height: 90vh;
  }
</style>
