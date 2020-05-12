<template>
  <v-container>
    <v-container v-if="!loading && questions.length!==0">
      <v-row v-for="quest in questions" :key="quest.id" style="padding-bottom: 0.8rem">
        <brief-card :quest="quest"/>
      </v-row>
    </v-container>
    <v-container v-if="loading" style="height: 100%;padding-bottom: 0">
      <v-dialog v-model="loading" persistent>
        <v-card>
          <v-card-title>
            正在加载...
          </v-card-title>
          <v-card-text>
            <v-progress-linear indeterminate/>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
    <v-layout align-center justify-center v-if="!loading&&questions.length===0">
      <v-container>
        <v-card color="warning">
          暂无数据
        </v-card>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import { Quests } from '~/store/Quests';
  import { getModule } from 'vuex-module-decorators';
  import Vue from 'vue';
  import BriefCard from '~/components/question/BriefCard.vue';

  export default Vue.extend({
      name: 'index',
      components: { BriefCard },
      async created() {
        await getModule(Quests, this.$store).fetchAll();
        this.loading = false;
      },
      computed: {
        questions() {
          return getModule(Quests, this.$store).list;
        },
      },
      data() {
        return {
          loading: true,
        };
      },
    },
  );
</script>

<style scoped>

</style>
