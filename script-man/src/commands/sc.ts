import {Command} from '@oclif/command'
import {resolve} from 'path'
import {existsSync} from 'fs'
import ServiceConfig from '../config.d/service-control.config'
import CommonService from '../service/common-service'
import Config from '../config'
import Log from "../log";

export enum ACTION {
  start = 'start', stop = 'stop', restart = 'restart', ls = 'ls', status = 'status'
}

export default class Sc extends Command {
  static description = `Service control
  services detail is stored in ${Config.json.config_file['service-control']}
  file format:
  [
    {
      name: string;
      type: string;
      options: { [key: string]: any };
    }
  ]
 `

  static flags = {}

  static args = [
    {
      name: 'action',
      options: Object.values(ACTION),
      required: true,
      default: ACTION.ls,
      description: 'action',
    },
    {
      name: 'name',
      description: 'Service name',
    },
  ]

  static manifest_filename = Config.json.config_file['service-control']

  loadServices(): { [key: string]: CommonService } {
    const jsonPath = resolve(Sc.manifest_filename)

    if (!existsSync(jsonPath))
      Log.error(`${Sc.manifest_filename} not found,for more see 'scma sc --help'`)
    const services: { [key: string]: CommonService } = {}
    const jsonServices: ServiceConfig[] = require(jsonPath)
    jsonServices.forEach(value => {
      const SvcClass = require(`../service/${value.type}.service`).default
      services[value.name] = new SvcClass(value)
    })
    return services
  }

  async run() {
    const {args} = this.parse(Sc)
    const services = this.loadServices()

    if (args.action === ACTION.ls)
      console.table(Object.keys(services).map(k => ({
        Type: services[k].type,
        Name: services[k].name,
      })))
    else if (Object.keys(services).includes(args.name)) {
      services[args.name].doAction(args.action)
    }
  }
}
