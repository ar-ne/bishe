<template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>
            新建模板
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="templateName" label="模板名称"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" :to="`/editor?n=${templateName}`">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex xs12 sm8 md6>
        <v-card min-width="50vw">
          <v-toolbar color="success" dark flat>
            <v-toolbar-title>Welcome</v-toolbar-title>
            <v-spacer/>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon large v-on="on">
                  <v-icon>mdi-select-all</v-icon>
                </v-btn>
              </template>
              <span>选择全部</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-btn to="/quests">
              <v-icon>mdi-view-list</v-icon>
              题目列表
            </v-btn>
            <v-btn to="/quests/edit">
              <v-icon>mdi-pencil-plus</v-icon>
              新建题目
            </v-btn>
            <v-btn @click="dialog=!dialog">
              <v-icon>mdi-pencil-plus</v-icon>
              新建模板
            </v-btn>
            <v-btn to="/answers">
              <v-icon>mdi-view-list</v-icon>
              查看回答
            </v-btn>
            <v-btn to="/teacher/track">
              <v-icon>mdi-view-list</v-icon>
              用户状态
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        dialog: false,
        templateName: 'default',
      };
    },
  };
</script>

<style scoped>

</style>
