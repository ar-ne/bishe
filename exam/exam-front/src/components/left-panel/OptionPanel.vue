<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" @click="toggleSelect(item)" router exact>
      <v-list-item-action>
        <v-switch v-model="item.enabled" @click.prevent="">
        </v-switch>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title"/>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { getModule } from 'vuex-module-decorators';
  import { OptionPanel, OptionPanelItem } from '~/store/OptionPanel';

  export default Vue.extend({
    name: 'OptionPanel',
    computed: {
      items() {
        return getModule(OptionPanel, this.$store).options;
      },
    },
    methods: {
      toggleSelect(option: OptionPanelItem) {
        getModule(OptionPanel, this.$store).toggleSelected(option);
      },
    },
  });
</script>

<style scoped>

</style>
