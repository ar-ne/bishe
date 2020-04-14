<template>
  <v-app>
    <v-navigation-drawer v-if="settings.xLeftPanelType!==undefined" v-model="drawer" :mini-variant="miniVariant"
                         :clipped="clipped" fixed app>
      <OptionPanel v-if="settings.xLeftPanelType==='option'"/>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app collapse-on-scroll hide-on-scroll>
      <v-app-bar-nav-icon v-if="settings.xLeftPanelType!==undefined" @click.stop="drawer = !drawer">
        <v-icon>mdi-cog</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title/>
      <v-spacer/>
      <v-btn icon elevation="0" v-for="item in toolbarItems" :to="item.to" :key="item.title">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="primary" dark v-on="on">{{item.icon}}</v-icon>
          </template>
          <span>{{item.title}}</span>
        </v-tooltip>
      </v-btn>
    </v-app-bar>
    <v-content class="x-content">
      <nuxt/>
    </v-content>
    <!--    <v-footer :fixed="fixed" app>-->
    <!--      <span>&copy; {{ new Date().getFullYear() }}</span>-->
    <!--    </v-footer>-->
  </v-app>
</template>

<script lang="ts">
  import OptionPanel from '~/components/left-panel/OptionPanel.vue';
  import Vue from 'vue';
  import { getModule } from 'vuex-module-decorators';
  import { DefaultLayoutSettings } from '~/store/DefaultLayoutSettings';
  import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css';

  export default Vue.extend({
    components: {
      OptionPanel,
    },
    computed: {
      settings() {
        return getModule(DefaultLayoutSettings, this.$store).settingProps;
      },
    },
    data() {
      return {
        collapse: false,
        clipped: false,
        drawer: false,
        fixed: false,
        miniVariant: false,
        toolbarItems: [
          {
            title: '题目列表',
            to: '/quests',
            icon: 'mdi-view-list',
          },
          {
            title: '首页',
            to: '/',
            icon: 'mdi-home',
          },
          {
            title: '退出登录',
            to: '/logout',
            icon: 'mdi-logout',
          },
        ],
      };
    },
  });
</script>
