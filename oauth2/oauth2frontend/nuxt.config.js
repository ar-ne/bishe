require('dotenv').config();
export default {
  router: {
    base: process.env.NUXT_ENV_BASE || '/',
  },
  mode: 'spa',
  srcDir: 'src/',
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', msg: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        msg: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#fff' },
  css: [],
  plugins: ['~/plugins/notification.ts'],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],
  dotenv: { path: './' },
  axios: {},
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/assets/vuetify.options.js',
    theme: {
      dark: false,
    },
    defaultAssets: false,
  },
  build: {},
};
