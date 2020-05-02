import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

export const socket = io('localhost:3001');
export default () => {
  Vue.use(VueSocketIOExt, io('localhost:3001'));
}
