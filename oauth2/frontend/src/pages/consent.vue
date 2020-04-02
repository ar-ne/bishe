<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar color="success" dark flat>
        <v-toolbar-title>Consent</v-toolbar-title>
        <v-spacer />
        <v-tooltip v-if="!consent.wait" bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              large
              @click="consent.scopes.forEach((v) => (v.check = true))"
              v-on="on"
            >
              <v-icon>mdi-select-all</v-icon>
            </v-btn>
          </template>
          <span>选择全部</span>
        </v-tooltip>
      </v-toolbar>
      <v-card-text v-if="consent.wait">
        Loading...
        <v-progress-linear
          indeterminate
          color="success"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
      <v-card-text>
        <v-form>
          <v-expand-transition>
            <v-list v-if="!consent.wait">
              <v-list-item-group
                v-for="(item, i) in consent.scopes"
                :key="item.name"
              >
                <v-list-item @click="item.check = !item.check">
                  <v-list-item-avatar>
                    <v-icon color="primary">mdi-book-account-outline</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <label style="font-weight: 600">{{ item.name }}</label>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-switch v-model="item.check" @click.prevent=""></v-switch>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="i < consent.scopes.length - 1"
                  :key="i"
                ></v-divider>
              </v-list-item-group>
            </v-list>
          </v-expand-transition>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="consent.wait" @click="submit" color="warning">
          取消
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
        <v-btn :disabled="consent.wait" color="primary" @click="submit">
          确认
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import { ConsentControllerApi } from '../generated/openapi';
  import { apiConfig } from '../api-config';

  export default {
    name: 'Consent',
    data() {
      const { challenge } = this.$route.query;
      if (challenge == null) {
        this.$notification.error('Challenge is empty!');
      } else this.$notification.debug(String(challenge));
      return {
        consent: {
          scopes: [],
          wait: true,
          canceled: false,
        },
        challenge,
      };
    },
    created() {
      const self = this;
      const api = new ConsentControllerApi(apiConfig);
      api
        .consentControllerGetSlash(String(self.$route.query.challenge), true)
        .then((value) => {
          const { requestedScope } = value.data;
          Object.assign(self.consent, {
            scopes: requestedScope.map((v) => ({ name: v, check: false })),
            wait: false,
          });
        })
        .catch((reason) => this.$notification.debug(reason, 'error'));
    },
    methods: {
      deny() {
        this.consent.canceled = true;
        this.submit();
      },
      submit() {
        const self = this;
        const body = {
          submit: !self.consent.canceled,
          challenge: self.challenge,
          scope: self.consent.scopes.filter((v) => v.check).map((v) => v.name),
          remember: true,
        };
        const api = new ConsentControllerApi(apiConfig);
        self.consent.wait = true;
        api.consentControllerPostSlash(true, body).then((value) => {
          const { success, redirect, errorDescription } = value.data;
          self.$notification.debug(value.data.toString());
          if (!success) self.$notification.error(errorDescription);
          window.location.href = redirect;
        });
      },
    },
    layout: 'auth',
  };
</script>
