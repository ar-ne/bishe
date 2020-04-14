import { Middleware } from '@nuxt/types';
import { getModule } from 'vuex-module-decorators';
import { DefaultLayoutSettings } from '~/store/DefaultLayoutSettings';

const DefaultLayoutSettingMiddleware: Middleware = (context) => {
  if (context.app.layout === undefined || context.app.layout === 'default') {
    getModule(DefaultLayoutSettings, context.store).setLeftPanelType(undefined, { show: false });
  }
};

export default DefaultLayoutSettingMiddleware;
