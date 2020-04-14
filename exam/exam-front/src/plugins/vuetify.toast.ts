import Vue from 'vue';
import Vuetify, { VBtn, VIcon, VSnackbar } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar';

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon,
  },
});

Vue.use(VuetifyToast, {
  x: 'right',
  y: 'top',
});
