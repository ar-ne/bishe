import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'DefaultLayoutSettings',
  namespaced: true,
  preserveState: true,
  stateFactory: true,
})
export class DefaultLayoutSettings extends VuexModule {
  settingProps: SettingProps = new SettingProps();

  @Mutation
  setLeftPanelType(type: tLeftPanelType, icon: Partial<tAppBarNavIcon>) {
    this.settingProps.xLeftPanelType = type;
    Object.assign(this.settingProps.vAppBarNavIcon, icon);

  }

  @Mutation
  setToolbarTitle(title: string) {
    this.settingProps.vToolbarTitle = title;
  }
}

export class SettingProps {
  vAppBarNavIcon: { show: boolean; icon: string } = {
    show: false,
    icon: 'mdi-cog',
  };
  xLeftPanelType: tLeftPanelType = undefined;
  vToolbarTitle: string = '';
}

export type tLeftPanelType = 'option' | 'questionInfo' | undefined

export interface tAppBarNavIcon {
  show: boolean;
  icon: string;
}
