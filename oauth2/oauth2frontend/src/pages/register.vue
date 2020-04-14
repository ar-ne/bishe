<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Register form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="用户名"
          name="username"
          prepend-icon="mdi-account"
          type="text"
        />

        <v-text-field
          label="密码"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        />

        <v-text-field
          label="重复密码"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary">注册</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    layout: 'auth',
    name: 'Register',
  };
</script>
