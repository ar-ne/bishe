import { Plugin } from '@nuxt/types';
import { Store } from 'vuex';

const notification = (store: Store<any>): NotificationInterfaceDeclare => {
  return {
    info: (msg) => {
      store.commit('notification/showMessage', {
        message: msg,
        color: 'info',
      });
    },
    error: (msg) => {
      store.commit('notification/showMessage', {
        message: msg,
        color: 'error',
      });
    },
    success: (msg) => {
      store.commit('notification/showMessage', {
        message: msg,
        color: 'success',
      });
    },
    debug: (msg, color = 'info') => {
      if (process.env.VUE_APP_DEBUG)
        store.commit('notification/showMessage', {
          message: msg,
          color,
        });
    },
  };
};

interface NotificationInterfaceDeclare {
  info: (msg: string) => void;
  error: (msg: string) => void;
  success: (msg: string) => void;
  debug: (msg: string, color?: string) => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $notification: NotificationInterfaceDeclare;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $notification: NotificationInterfaceDeclare;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $notification: NotificationInterfaceDeclare;
  }
}

const notificationPlugin: Plugin = (context, inject) => {
  inject('notification', notification(context.store));
};

export default notificationPlugin;
