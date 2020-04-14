import { Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import { Question, QuestionControllerApi } from '~/generated/openapi';
import { apiConfig } from '~/api-config';

const api = new QuestionControllerApi(apiConfig);

@Module({
  name: 'Quests',
  namespaced: true,
  preserveState: true,
  stateFactory: true,
})
export class Quests extends VuexModule {
  list: Quest[] = [];

  @MutationAction({ mutate: ['list'] })
  async fetchAll() {
    return {
      list: await api.questionControllerFind().then(v => v.data),
    };
  }

  @MutationAction({ mutate: ['list'] })
  async fetchOne(id: number) {
    if (this.list != null && this.list.find(v => v.id === id))
      return { list: this.list };
    const one = await api.questionControllerFindById(id).then(v => v.data);
    const l2: Quest[] = [{ ...one }];
    if (this.list != null) l2.concat(this.list);
    return {
      list: l2,
    };
  }

  get getQuest() {
    const self = this;
    return (id: number) => {
      return self.list.find(v => v.id === id);
    };
  }
}

export interface Quest extends Question {
  // clicked?: boolean;
  [key: string]: any
}
