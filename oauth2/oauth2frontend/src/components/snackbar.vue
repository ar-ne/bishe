<template>
  <v-snackbar v-model="show" :color="color" top left>
    {{ message }}
    <v-btn text @click="show = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        message: '',
        color: '',
      };
    },

    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'notification/showMessage') {
          this.message = state.notification.message;
          this.color = state.notification.color;
          this.show = true;
        }
      });
    },
  };
</script>
