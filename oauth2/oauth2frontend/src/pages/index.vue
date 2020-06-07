<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <ValidationObserver ref="observer">
        <v-form>
          <ValidationProvider
            v-slot="{ errors }"
            name="用户名"
            rules="required"
          >
            <v-text-field
              v-model="form.username"
              :error-messages="errors"
              label="用户名"
              prepend-icon="mdi-account"
              type="text"
            />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="密码" rules="required">
            <v-text-field
              v-model="form.password"
              label="密码"
              :error-messages="errors"
              prepend-icon="mdi-lock"
              type="password"
            />
          </ValidationProvider>
        </v-form>
      </ValidationObserver>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="submit">登录</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';
  import { LoginControllerApi } from '../generated/openapi';
  import { apiConfig } from '../api-config';

  setInteractionMode('eager');
  extend('required', {
    ...required,
    message: '{_field_}不能为空',
  });

  export default {
    layout: 'auth',
    head() {
      return {
        title: '登录',
      };
    },

    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
      const self = this;
      const { challenge } = self.$route.query;
      if (challenge == null) {
        self.$notification.error('Challenge is empty!');
        self.$router.push('/register');
      } else self.$notification.debug(String(challenge));
      return {
        form: {
          username: '',
          password: '',
          challenge,
        },
        loading: false,
      };
    },

    methods: {
      async submit() {
        const self = this;
        const valid = await self.$refs.observer.validate();
        if (!valid) {
          self.$notification.error('请填写必要信息');
          return;
        }
        const api = new LoginControllerApi(apiConfig);

        const userinfo = { ...self.form};
        api.loginControllerPostSlash(true, userinfo).then((value) => {
          const { success, message, redirect } = value.data;
          if (!success) self.$notification.error(message);
          else window.location.href = redirect;
        });
      },
    },
  };
</script>
