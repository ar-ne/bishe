<template>
  <v-container>
    <v-card v-if="loading">
      Loading~
    </v-card>
    <v-card v-if="!loading">
      <v-card-title>
        {{quest.id}}. {{quest.title}}
        <v-spacer/>
        <v-btn
          v-if="$auth.user.role==='teacher'"
          :to="`/answers?id=${id}`"
          style="margin-right: 12px">
          <v-icon>mdi-telescope</v-icon>
          查看回答
        </v-btn>
        <v-btn
          v-if="$auth.user.role==='teacher'"
          :to="`/quests/edit?edit=1&id=${id}`"
          style="margin-right: 12px">
          <v-icon>mdi-square-edit-outline</v-icon>
          编辑题目
        </v-btn>
        <v-btn :to="`/editor?q=${id}`">
          <v-icon>mdi-square-edit-outline</v-icon>
          开始作答
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        {{`${quest.score||''}\t${quest.author||''}`}}
      </v-card-subtitle>
      <v-divider/>
      <v-card-text>
        <v-container v-if="quest.brief && quest.brief.length!==0">
          <!--          <h4>简述</h4>-->
          <div class="md" v-html="Renderer(quest.brief)"/>
          <v-divider/>
        </v-container>
        <v-container style="padding-top: 12px">
          <!--          <h4>详情</h4>-->
          <div class="md" v-html="Renderer(quest.detail)"/>
        </v-container>
        <v-container v-if="quest.examples && quest.examples.length!==0">
          <v-divider style="padding-bottom: 12px"/>
          <!--          <h4>示例</h4>-->
          <v-row v-for="(item,i) in quest.examples" :key="i">
            <v-col>
              <v-label>输入:</v-label>
              <div class="md" v-html="Renderer(`\`\`\`${item.input}\`\`\``)"/>
            </v-col>
            <v-col>
              <v-label>输出:</v-label>
              <div class="md" v-html="Renderer(`\`\`\`${item.output}\`\`\``)"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { getModule } from 'vuex-module-decorators';
  import { Quests } from '~/store/Quests';
  import { Renderer } from 'vuetify-markdown-editor';

  export default Vue.extend({
    name: 'quest',
    validate({ params, store }) {
      // Must be a number
      return /^\d+$/.test(params.id) ||
        getModule(Quests, store).getQuest(Number(params.id)) !== undefined;
    },

    async created() {
      await getModule(Quests, this.$store).fetchOne(Number(this.$route.params.id));
      this.id = this.$route.params.id;
      this.loading = false;
    },
    computed: {
      quest() {
        return getModule(Quests, this.$store).getQuest(Number(this.$route.params.id));
      },
    },
    data() {
      return {
        loading: true,
        Renderer: Renderer,
        id: '',
      };
    },
  });
</script>

<style scoped>

</style>
