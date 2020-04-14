<template>
    <v-hover v-slot:default="{hover}" close-delay="100">
        <v-card width="100%" :elevation="hover ? 16 : 2" :to="'/quests/'+quest.id">
            <v-card-title>
                {{quest.id}}. {{quest.title}}
            </v-card-title>
            <v-card-subtitle v-if="quest.score && quest.score.length!==0">
                {{quest.score}}分
            </v-card-subtitle>
            <v-card-text>
                <div class="md" v-html="Renderer(quest.brief)"/>
            </v-card-text>
        </v-card>
    </v-hover>
</template>

<script lang="ts">
  import Vue, { PropOptions } from 'vue';
  import { Quest } from '~/store/Quests';
  import { Renderer } from 'vuetify-markdown-editor';

  export default Vue.extend({
    name: 'BriefCard',
    props: {
      quest: {
        type: Object,
        required: true,
      } as PropOptions<Quest>,
    },
    data() {
      return {
        Renderer: Renderer,
      };
    },
  });
</script>

<style scoped>

</style>
