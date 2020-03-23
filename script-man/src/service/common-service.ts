import ServiceConfig from '../config.d/service-control.config'
import {ACTION} from '../commands/sc'

export default abstract class CommonService {
  private readonly actions: { [key: string]: () => PromiseLike<any> }

  get name() {
    return this._config.name
  }

  get type() {
    return this._config.type
  }

  get options() {
    return this._config.options
  }

  protected readonly _config: ServiceConfig

  protected constructor(config: ServiceConfig) {
    this._config = config
    this.actions = {start: this.start, stop: this.stop, restart: this.restart, status: this.status}
  }

  async doAction(a: ACTION) {
    if (a === ACTION.ls) return
    return this.actions[a].call(this).then(r => r)
  }

  protected async restart() {
    const stopResult = await this.stop()
    const startResult = await this.start()
    return Promise.all([stopResult, startResult])
  }

  protected abstract start(): PromiseLike<any>

  protected abstract stop(): PromiseLike<any>

  protected abstract status(): PromiseLike<any>
}
