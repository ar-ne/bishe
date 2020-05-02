import { Configuration } from '~/generated/openapi';
import { BASE_PATH } from '~/generated/openapi/base';
import { token } from '~/plugins/axios.config';

export const apiConfig = (): Configuration => ({
  basePath: process.env.VUE_APP_BACKEND_URL || BASE_PATH,
  baseOptions: {
    headers: {
      Authorization: token,
    },
  },
});
