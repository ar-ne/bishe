import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import { Store } from 'vuex';

export const socket = io('localhost:3001');
export default (store: Store<any>) => {
  Vue.use(VueSocketIOExt, io('localhost:3001'));
}
