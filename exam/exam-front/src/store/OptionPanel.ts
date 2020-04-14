import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'OptionPanel',
  namespaced: true,
  preserveState: true,
  stateFactory: true,
})
export class OptionPanel extends VuexModule {
  options: OptionPanelItem[] = [];

  @Mutation
  // Action({ mutate: ['options'] })
  setOptions(options: OptionPanelItem[]) {
    this.options = options;
    // return { options };
  }

  @Mutation
  toggleSelected(option: OptionPanelItem) {
    option.enabled = !option.enabled;
  }

  get getOption() {
    return (field: string) => {
      return this.options.find(value => value.field === field);
    };
  }
}

export interface OptionPanelItem {
  title: string;
  enabled: boolean;
  field: string;
}
