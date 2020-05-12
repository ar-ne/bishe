<template>
  <v-container>
    <v-container v-if="!loading">
      <v-hover v-slot:default="{hover}" close-delay="100" v-for="ans in answer" :key="ans.id"
               style="margin-bottom: 12px">
        <v-card width="100%" :elevation="hover ? 16 : 2">
          <v-card-title>
            题目: {{ans.question}}. {{q(ans.question).title}}
          </v-card-title>
          <v-card-text>
            <v-btn @click="open(`${bacK}/files/dl/${ans.content}`)">
              <v-icon>mdi-link</v-icon>
              <span>下载项目压缩包</span>
            </v-btn>
            <v-btn :to="`/answers/${ans.id}`">
              <v-icon>mdi-open-in-new</v-icon>
              <span>查看回答</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-container>
    <v-container v-if="loading" style="height: 100%;padding-bottom: 0">
      <v-dialog v-model="loading" persistent>
        <v-card>
          <v-card-title>
            Loading...
          </v-card-title>
          <v-card-text>
            <v-progress-linear indeterminate/>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { AnswerControllerApi, AnswerWithRelations } from '~/generated/openapi';
  import { apiConfig, BACKEND_URL } from '~/api-config';
  import { getModule } from 'vuex-module-decorators';
  import { Quests } from '~/store/Quests';

  export default Vue.extend({
    name: 'my',

    async created() {
      const self = this;
      // @ts-ignore
      this.answer = await new AnswerControllerApi(apiConfig()).answerControllerFind(JSON.stringify({
        where: {
          user: self.$auth.user.name,
        },
      })).then((v: { data: AnswerWithRelations }) => v.data);
      await getModule(Quests, self.$store).fetchAll();
      self.loading = false;
    },
    computed: {
      q() {
        return getModule(Quests, this.$store).getQuest;
      },
    },
    methods: {
      open(url: string) {
        window.open(url);
      },
    },

    data() {
      return {
        answer: {} as AnswerWithRelations[],
        loading: true,
        bacK: BACKEND_URL,
      };
    },
  });
</script>

<style scoped>

</style>
