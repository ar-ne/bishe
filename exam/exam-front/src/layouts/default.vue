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
      <v-toolbar-title>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn icon elevation="0" v-for="item in toolbarItems" :to="item.to" :key="item.title">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="primary" dark v-on="on">{{item.icon}}</v-icon>
          </template>
          <span>{{item.title}}</span>
        </v-tooltip>
      </v-btn>
      <div class="v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 10 10" width="50%">
          <circle cx="5" cy="5" r="4" stroke-width="1.5" stroke="#00247D" fill="#fff"/>
          <circle cx="5" cy="5" r="2" fill="#CE1126"/>
        </svg>
      </div>
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
    name: 'defaultLayout',
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

<style scoped>
  .container1 {
    display: flex;
    justify-content: center;
    align-items: center;
    /*height: 100vh;*/
  }

  .circle {
    width: 1rem;
    height: 1rem;
    background-color: red;
    border-radius: 50%;
    position: relative;

  }

  .circle::after {
    content: '';
    background-color: rgba(0,0,0,0);
    width: 2rem;
    height: 2rem;
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    top: -0.5rem;
    left: -0.5rem;

  }

  .circle::before {
    content: '';
    background-color: green;
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    top: -0.75rem;
    left: -0.75rem;

  }
</style>
