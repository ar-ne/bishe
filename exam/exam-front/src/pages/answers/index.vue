<template>
  <v-container>
    <v-container>
      <v-card :loading="loading" :disabled="loading">
        <v-card-title>
          <span v-if="loading">加载中</span>
          <v-spacer></v-spacer>
          <v-text-field
            v-if="!loading"
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索"
            single-line
            hide-details/>
        </v-card-title>
        <v-card-text v-if="!loading">
          <v-data-table
            :headers="hs"
            :items="items"
            :search="search"
            show-group-by
            multi-sort
            @click:row="handleClick"/>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { getModule } from 'vuex-module-decorators';
  import { Answers } from '~/store/Answers';

  export default Vue.extend({
    name: 'index',

    async created() {
      const self = this;
      await getModule(Answers, self.$store).fetchAll();
      this.search = String(this.$route.query.id || '');
      this.loading = false;
    },

    computed: {
      items() {
        return getModule(Answers, this.$store).list.map(v => {
          return {
            'ID': v.id,
            '答题人': v.ans.user,
            '题目': v.ans.question,
            '记录': v.rec?.timeline.length,
            '提交时间': new Date(Number(v.rec?.endTime)).toLocaleString(),
          };
        });
      },
    },

    methods: {
      handleClick(value: { ID: number }) {
        this.loading = true;
        this.$router.push('/answers/' + value.ID);
      },
    },

    data() {
      return {
        loading: true,
        search: '',
        hs: [
          { text: 'ID', value: 'ID', sortable: true },
          { text: '答题人', value: '答题人', sortable: true },
          { text: '题目', value: '题目', sortable: true },
          { text: '记录', value: '记录', sortable: true },
          { text: '提交时间', value: '提交时间', sortable: true },
        ],
      };
    },
  });
</script>

<style scoped>

</style>
