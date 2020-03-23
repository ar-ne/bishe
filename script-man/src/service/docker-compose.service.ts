import CommonService from './common-service'
import Dc from '../commands/dc'
import ServiceConfig from '../config.d/service-control.config'
import {resolve} from "path";

export default class DockerComposeService extends CommonService {
  protected cwd: string;

  private readonly argv: string[]

  constructor(config: ServiceConfig) {
    super(config)
    this.cwd = resolve(this.options.cwd)
    this.argv = [`--cwd=${this.cwd}`]
  }

  async start() {
    await Dc.run([...this.argv, 'up'])
  }

  async stop() {
    await Dc.run([...this.argv, 'down'])
  }

  async status() {
    await Dc.run([...this.argv, 'status'])
  }
}
