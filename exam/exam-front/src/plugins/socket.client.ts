import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

export const socket = io(`${process.env.VUE_APP_EXAM_WS}/FRONT`);
export default () => {
  Vue.use(VueSocketIOExt, io(`${process.env.VUE_APP_EXAM_WS}/FRONT`));
}
