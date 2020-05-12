<template>
  <v-container>
    <v-container>
      <v-card style="margin-bottom: 12px">
        <v-card-title>
          <span>用户:</span>
          <v-spacer/>
          <span>最后位置:</span>
        </v-card-title>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'track',
    created() {

    },
    data() {
      return {
        socket:io()
      };
    },
  });
</script>

<style scoped>

</style>
