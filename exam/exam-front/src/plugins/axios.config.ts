import { Plugin } from '@nuxt/types';

export let token = '';
const axiosConfig: Plugin = (ctx) => {
  token = ctx.$auth.getToken('hydra');
  ctx.app.$axios.setToken(token);
};

export default axiosConfig;
