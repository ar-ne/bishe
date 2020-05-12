<template>
  <v-container style="height: Calc(100vh - 64px);">
    <v-container style="height: 100%;padding-bottom: 0">
      <v-dialog v-model="loading" persistent>
        <v-card>
          <v-card-title>
            Loading...
          </v-card-title>
          <v-card-text>
            <v-progress-linear indeterminate/>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-card v-if="!loading" style="height: 100%; display: flex; flex-flow: column">
        <v-card-title>
          <span>回答 {{awr.id}}</span>
          <v-spacer/>
          <v-switch
            :disabled="!awr.analysis.finished"
            label="显示时间线"
            v-model="showTimeline"/>
        </v-card-title>
        <v-card-subtitle>
          <span>答题人 {{awr.ans.user}}</span>&nbsp;
          <nuxt-link :to="`/quests/${awr.ans.question}`">
            题目&nbsp;{{awr.ans.question}}
          </nuxt-link>
          <v-divider/>
        </v-card-subtitle>
        <v-card-text style="height: inherit">
          <v-btn @click="open(`${back}/files/dl/${awr.ans.content}`)">
            <v-icon>mdi-download</v-icon>
            <span>下载项目压缩包</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container style="padding-top: 0">
      <v-timeline v-if="!loading && showTimeline" dense clipped>
        <v-timeline-item color="success">
          <v-card>
            <v-row>
              <v-col cols="8">
                <v-card elevation="0">
                  <v-card-title>
                    开始答题
                    <v-spacer/>
                  </v-card-title>
                  <v-card-text>
                    <v-icon>mdi-clock</v-icon>
                    {{new Date(Number(awr.rec.startTime))}}
                    <v-spacer/>
                    <div v-if="awr.analysis.finished" style="padding-top: 1rem">
                      <v-icon>mdi-file-document-edit</v-icon>
                      <span style="color: #00bf10">+{{awr.analysis.result.add}}</span>
                      /
                      <span class="summaryText" style="color: orangered">-{{awr.analysis.result.del}}</span>
                      <v-icon>mdi-undo-variant</v-icon>
                      <span class="summaryText" style="color: darkblue">{{awr.analysis.result.undo}}</span>
                      <v-icon>mdi-content-paste</v-icon>
                      <span class="summaryText" style="color: #13638b">{{awr.analysis.result.paste}}</span>
                    </div>
                    <span v-else>
                      分析未完成
                    </span>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="4">
                <v-card elevation="0">
                  <v-card-text>
                    <v-switch label="全部展开" inset v-model="collapse" style="padding-bottom: 0"/>
                    <v-switch label="显示原始数据" inset v-model="showRaw"/>
                    <!--                    <v-switch label="显示片段" inset v-model="showRaw"/>-->
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-timeline-item>
        <v-timeline-item v-for="(item,i) in rec" :key="i" color="grey" small>
          <v-hover v-slot:default="{ hover }" open-delay="100" close-delay="100">
            <v-card :elevation="hover ? 16 : 2">
              <v-card-subtitle>
                {{new Date(Number(item.time)).toISOString().substring(11).replace('Z',' ')}}
                <v-icon :color="getActIco(awr.analysis.result.timeline[i].action).color">
                  {{getActIco(awr.analysis.result.timeline[i].action).icon}}
                </v-icon>
                {{awr.analysis.result.timeline[i].action}}
                <span style="color: #00bf10">
                  +{{awr.analysis.result.timeline[i].add}}
                </span>
                /
                <span class="summaryText" style="color: orangered">
                  -{{awr.analysis.result.timeline[i].del}}
                </span>
                {{item.event.changes?item.event.changes[0].text:''}}
              </v-card-subtitle>
              <v-expand-transition>
                <div v-show="collapse||hover">
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-list dense>
                      <v-list-item>
                        事件: {{item.type}}
                      </v-list-item>
                      <v-list-item>
                        位置: {{item.event.changes?getPos(item.event.changes[0].range):'无'}}
                      </v-list-item>
                      <!--                      <v-list-item>-->
                      <!--                        代码片段:-->
                      <!--                        <div class="md" v-html="Renderer(`\`\`\`${item.value}\`\`\``)"></div>-->
                      <!--                      </v-list-item>-->
                      <v-list-item v-if="showRaw">
                        RawEvent
                        <v-treeview
                          dense
                          hoverable
                          open-on-click
                          open-all
                          :items="tree[i]"/>
                      </v-list-item>

                    </v-list>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-timeline-item>
        <v-timeline-item color="error">
          <v-card>
            <v-card-title>
              结束
            </v-card-title>
            <v-card-text>
              <v-icon>mdi-clock</v-icon>
              {{new Date(Number(awr.rec.endTime))}}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </v-container>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { Answers, AnsWRec } from '~/store/Answers';
  import { getModule } from 'vuex-module-decorators';
  import { Renderer } from 'vuetify-markdown-editor';
  import getTree, { TreeViewItems } from '~/toTreeView';
  import MonacoEditor from '~/components/MonacoEditor.vue';
  import { editor, IRange } from 'monaco-editor';
  import { BACKEND_URL } from '~/api-config';
  import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

  export default Vue.extend({
    name: 'answer-page',
    components: {
      MonacoEditor,
    },
    async created() {
      await getModule(Answers, this.$store).fetchOne(this.id);
      this.awr = Object.freeze(await getModule(Answers, this.$store).getAWR(this.id)!);
      this.rec = Object.freeze(this.awr.rec?.timeline.map(v => JSON.parse(v)));
      this.tree = Object.freeze(this.rec.map((v: any) => getTree(v.event)));
      this.loading = false;
    },
    computed: {
      getPos() {
        return (r: IRange) => {
          return `${r.startLineNumber}:${r.startColumn} ~ ${r.endLineNumber}:${r.endColumn}`;
        };
      },
      getActIco() {
        return (action: string) => {
          switch (action) {
            case '编辑':
              return { icon: 'mdi-marker', color: 'primary' };
            case '撤销':
              return { icon: 'mdi-undo-variant', color: 'warning' };
            case '重做':
              return { icon: 'mdi-redo-variant', color: 'warning' };
            case '删除':
              return { icon: 'mdi-backspace', color: 'error' };
            case '创建':
              return { icon: 'mdi-note-plus', color: 'success' };
            case '粘贴':
              return { icon: 'mdi-content-paste', color: 'cyan' };
            default:
              return { icon: 'mdi-file-question', color: 'gray' };
          }
        };
      },
    },
    data() {
      return {
        awr: {} as AnsWRec,
        rec: [] as any,
        tree: [] as TreeViewItems[],
        getTree: getTree,
        Renderer: Renderer,
        showRaw: false,
        loading: true,
        showTimeline: false,
        back: BACKEND_URL,
        open: (url: string) => window.open(url),
        collapse: false,
        id: Number(this.$route.params.id),
        monacoOption: { readOnly: true } as IStandaloneEditorConstructionOptions,
      };
    },
  });
</script>

<style scoped>
  #editor {
    height: 100%;
  }

  .summaryText {
    padding-right: 1rem;
  }
</style>
