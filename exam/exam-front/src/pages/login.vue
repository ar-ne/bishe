<template>
  <div>
    <h3>Login</h3>
    if not redirect automatically please click
    <v-btn type="primary" @click="login()">Login via oauth2</v-btn>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$auth.loginWith('hydra');
    },
    methods: {
      login() {
        this.$auth.loginWith('hydra');
      },
    },
  };
</script>

<style scoped>

</style>
