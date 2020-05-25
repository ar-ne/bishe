<template>

</template>

<script lang='ts'>
  import Vue, { PropType } from 'vue';
  import { UserTrack, UserTrackInfo } from '~/generated/openapi';

  export default Vue.extend({
    name: 'UserStateCard',

    props: {
      user_track: {
        type: Object as PropType<UserTrack>,
        required: true,
      },
    },

    computed: {
      latestActive(): UserTrackInfo {
        return this.timeline[this.timeline.length - 1];
      },
    },

    data() {
      return {
        userName: this.user_track.user,
        timeline: this.user_track.timeline,
      };
    },
  });
</script>

<style scoped>

</style>
