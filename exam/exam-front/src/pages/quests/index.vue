<template>
  <v-container>
    <v-row v-for="quest in questions" :key="quest.id" style="padding-bottom: 0.8rem">
      <brief-card :quest="quest"/>
    </v-row>
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
      created(): void {
        getModule(Quests, this.$store).fetchAll();
      },
      computed: {
        questions() {
          return getModule(Quests, this.$store).list;
        },
      },
    },
  );
</script>

<style scoped>

</style>
