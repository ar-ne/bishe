import { Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import {
  AnswerControllerApi,
  AnswerWithRelations,
  RecordControllerApi,
  RecordWithRelations,
  TimelineAnalysisWithRelations,
  TlAnalysisControllerApi,
} from '~/generated/openapi';
import { apiConfig } from '~/api-config';


@Module({
  name: 'Answers',
  namespaced: true,
  preserveState: true,
  stateFactory: true,
})
export class Answers extends VuexModule {
  list: AnsWRec[] = [];

  @MutationAction({ mutate: ['list'] })
  async fetchAll() {
    const allAns = await new AnswerControllerApi(apiConfig()).answerControllerFind().then(v => v.data);
    const allRec = await new RecordControllerApi(apiConfig()).recordControllerFind().then(v => v.data);
    const list: AnsWRec[] = [];
    allAns.forEach(ans => {
      const rec = allRec.find(v => v.answer === ans.id);
      list.push({
        id: ans.id!,
        ans, rec,
      });
    });
    return { list };
  }

  @MutationAction({ mutate: ['list'] })
  async fetchOne(id: number) {
    const ans = await new AnswerControllerApi(apiConfig()).answerControllerFindById(id).then(v => v.data);
    const rec = await new RecordControllerApi(apiConfig()).recordControllerFindById(id).then(v => v.data);
    const analysis = await new TlAnalysisControllerApi(apiConfig()).tlAnalysisControllerFindById(id).then(v => v.data);
    return {
      list: [{ id: ans.id, ans, rec, analysis }],
    };
  }

  get getAWR() {
    return (id: number) => {
      return this.list.find(v => v.id == id);
    };
  }

}

export interface AnsWRec {
  id: number;
  ans: AnswerWithRelations;
  rec?: RecordWithRelations;
  analysis?: TimelineAnalysisWithRelations;
}
