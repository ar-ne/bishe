import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'notification',
  namespaced: true,
  preserveState: true,
})
export class Notification extends VuexModule {
  message = '';
  color = '';

  @Mutation
  showMessage({ message, color }: { message: string; color: string }) {
    this.message = message;
    this.color = color;
  }
}
