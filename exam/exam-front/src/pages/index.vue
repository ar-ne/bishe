<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>正在重定向，请稍后...</h1>
      <!--      <v-btn @click="clickButton">test</v-btn>-->
      <!--      <span>{{ $socket.connected ? 'Connected' : 'Disconnected' }}</span>-->
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    sockets: {
      connect() {
        console.log('socket connected');
      },
      customEmit(val) {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
      },
    },
    beforeMount(): void {
      const user = this.$auth.user;
      if (user.role === 'teacher')
        this.$router.push('/teacher');
      else this.$router.push('/quests');
    },
    methods: {
      clickButton() {
        // this.$socket.client isd `socket.io-client` instance
        this.$socket.client.emit('msg', 'val');
        this.$socket.client.emit('msg', JSON.stringify(this.$auth.user));
        // this.$socket.client.connect();
        this.$toast.success('创建成功');
      },
    },
  });
</script>
