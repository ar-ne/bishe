import MonacoEditorPlugin from 'monaco-editor-webpack-plugin';

require('dotenv').config();
export default {
  router: {
    base: process.env.NUXT_ENV_BASE || '/',
    middleware: ['auth', 'DefaultLayoutSettingMiddleware', 'UserStateMonitor'],
  },
  mode: 'spa',
  srcDir: 'src/',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/socket.client.ts',
    '~/plugins/vuetify.toast.ts',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
  ],
  auth: {
    plugins: [{ src: '~/plugins/axios.config.ts' }],
    strategies: {
      hydra: {
        _scheme: 'oauth2',
        authorization_endpoint: process.env.OAUTH2_AUTHORIZATION_ENDPOINT,
        userinfo_endpoint: process.env.OAUTH2_USERINFO_ENDPOINT,
        access_type: 'offline',
        access_token_endpoint: process.env.OAUTH2_TOKEN_ENDPOINT,
        response_type: 'token',
        token_type: 'Bearer',
        redirect_uri: undefined,
        client_id: process.env.OAUTH2_CLIENT_ID,
        token_key: 'access_token',
        state: 'UNIQUE_AND_NON_GUESSABLE',
      },
    },
    redirect: {
      login: '/login',
      callback: '/callback',
      home: '/',
    },
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  dotenv: { path: './' },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/assets/vuetify.options.js',
    defaultAssets: false,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.devtool = 'eval-source-map';
      config.plugins.push(new MonacoEditorPlugin({
        // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        // Include a subset of languages support
        // Some language extensions like typescript are so huge that may impact build performance
        // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
        // Languages are loaded on demand at runtime
        languages: ['javascript', 'css', 'java', 'html', 'typescript'],
      }));
    },
  },
};
