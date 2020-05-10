import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

export const socket = io('http://localhost:3001/FRONT');
export default () => {
  Vue.use(VueSocketIOExt, io('http://localhost:3001/FRONT'));
}
