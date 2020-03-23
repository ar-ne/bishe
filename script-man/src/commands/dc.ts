import {Command, flags} from '@oclif/command'
import SubprocessWrapper from '../subprocess-wrapper'

enum ACTION {
  up = 'up', down = 'down', r = 'r', status = 'status'
}

export default class Dc extends Command {
  static description = 'docker-compose tools'

  static flags = {
    demo: flags.boolean({
      char: 'd',
      default: true,
      description: 'run in demo',
      allowNo: true,
    }),
    volume: flags.boolean({
      char: 'v',
      default: false,
      description: 'delete named volumes',
      allowNo: true,
    }),
    cwd: flags.string({
      char: 'c',
      description: 'set current working dir for the command',
    }),
    buildImage: flags.boolean({
      char: 'b',
      description: '--build when up',
      default: false
    })
  }

  static args = [
    {
      name: 'action',
      required: true,
      options: Object.values(ACTION),
      description: `docker-compose action
      \t'up' for start
      \t'down' for stop and remove
      \t'r' for restart with container removed
      \t 'status' is an alias of 'docker-compose top'`,
    },
    {
      name: 'override',
      options: ['dev', 'production'],
      description: 'docker-compose config override\noverride docker-compose.yml with docker-compose.<override type>.yml',
    },
  ]

  async run() {
    const {args, flags} = this.parse(Dc)
    const cmd = ['docker-compose']
    if (args.override) {
      cmd.push('-f', 'docker-compose.yml')
      cmd.push('-f', `docker-compose.${args.override}.yml`)
    }

    const flag = []
    switch (args.action as ACTION) {
      case ACTION.up:
        cmd.push(args.action)
        if (flags.demo) cmd.push('-d')
        if (flags.buildImage) cmd.push('--build')
        break
      case ACTION.down:
        cmd.push(args.action)
        if (flags.volume) cmd.push('-v')
        break
      case ACTION.r:
        if (args.override) flag.push(args.override)
        if (flags.volume) flag.push('-v')
        if (flags.demo) flag.push('-d')
        if (flags.buildImage) flag.push('-b')
        await Dc.run(['down', ...flag])
        await Dc.run(['up', ...flag])
        return
      case ACTION.status:
        cmd.push('top')
    }

    return new SubprocessWrapper(cmd, flags.cwd)
  }
}
