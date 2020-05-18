<template>
  <v-container>
    <v-container v-if="!loading">
      <v-hover v-for="ut in uts" :key="ut.user" v-slot:default="{hover}" open-delay="100" close-delay="100">
        <v-card style="margin-bottom: 12px" :elevation="hover ? 16 : 2">
          <v-card-title>
            <v-icon color="primary">mdi-account</v-icon>
            <span>{{ut.user}}</span>
            <v-spacer/>
            <span>{{minutesToNow(lastAct(ut))<1?secondToNow(lastAct(ut))+'秒前':minutesToNow(lastAct(ut))+'分钟前'}}</span>
            <span>
              <v-icon color="success">
                {{lastAct(ut).action.from===lastAct(ut).action.to?'mdi-refresh':'mdi-near-me'}}
              </v-icon>
              {{lastAct(ut).action.from===lastAct(ut).action.to?lastAct(ut).action.to:
              `${lastAct(ut).action.from}=>${lastAct(ut).action.to}`
              }}
            </span>
          </v-card-title>
          <v-expand-transition>
            <v-card-text v-if="hover">
              <v-divider/>
              <v-timeline dense clipped>
                <v-timeline-item color="cyan" small v-for="(item,i) in ut.timeline.slice(0,5)" :key="i">
                  <div>
                    <v-spacer/>
                    <span>{{minutesToNow(item)<1?secondToNow(item)+'秒前':minutesToNow(item)+'分钟前'}}</span>
                    <v-icon color="success">
                      {{item.action.from===item.action.to?'mdi-refresh':'mdi-near-me'}}
                    </v-icon>
                    <span>
                      {{item.action.from===item.action.to?item.action.to:`${item.action.from}=>${item.action.to}`}}
                    </span>
                  </div>
                </v-timeline-item>
<!--                <v-expand-transition>-->
<!--                  <v-timeline-item color="cyan" small v-for="(item,i) in ut.timeline.slice(6)" :key="i">-->
<!--                    <div>-->
<!--                      <v-spacer/>-->
<!--                      <span>{{minutesToNow(item)<1?secondToNow(item)+'秒前':minutesToNow(item)+'分钟前'}}</span>-->
<!--                      <v-icon color="success">-->
<!--                        {{item.action.from===item.action.to?'mdi-refresh':'mdi-near-me'}}-->
<!--                      </v-icon>-->
<!--                      <span>-->
<!--                      {{item.action.from===item.action.to?item.action.to:`${item.action.from}=>${item.action.to}`}}-->
<!--                    </span>-->
<!--                    </div>-->
<!--                  </v-timeline-item>-->
<!--                </v-expand-transition>-->
              </v-timeline>
            </v-card-text>
          </v-expand-transition>
        </v-card>
      </v-hover>
    </v-container>
    <v-container v-if="loading">
      <v-dialog v-model="loading" persistent>
        <v-card>
          <v-card-title>
            正在加载...
          </v-card-title>
          <v-card-text>
            <v-progress-linear indeterminate/>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import UserStateCard from '~/components/UserStateCard.vue';
  import io from 'socket.io-client';
  import { UserTrack, UserTrackInfo } from '~/generated/openapi';

  const socket = io(`${process.env.VUE_APP_EXAM_WS}/TRACK`);

  export default Vue.extend({
    name: 'tracker',
    components: {
      UserStateCard,
    },
    created() {
      const self = this;
      socket.on('update', (uts: UserTrack[]) => {
        self.uts = uts.map(v => {
          return {
            user: v.user,
            timeline: v.timeline.reverse(),
          };
        });
        if (uts.length !== 0) {
          self.loading = false;
        }
      });
      socket.connect();
    },
    mounted() {
      const self = this;
      setInterval(() => {
        self.now = new Date();
      }, 1000);
      socket.emit('init');
    },
    computed: {
      lastAct() {
        return (ut: UserTrack): UserTrackInfo => {
          return ut.timeline[0];
        };
      },
      minutesToNow() {
        return (t: UserTrackInfo) => {
          return Math.floor(Math.abs((this.now.getTime() - t.time)) / 60000);
        };
      },
      secondToNow() {
        return (t: UserTrackInfo) => {
          return Math.floor(Math.abs((this.now.getTime() - t.time)) / 1000);
        };
      },
    },
    data() {
      return {
        loading: true,
        uts: [] as UserTrack[],
        now: new Date(),
      };
    },
    methods: {
      updateTime() {
        this.now = new Date();
      },
    },
  });
</script>

<style scoped>

</style>
