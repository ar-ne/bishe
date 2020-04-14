import { Command, flags } from '@oclif/command';

import * as Dockerode from 'dockerode';
import * as _ from 'lodash';
import Config from '../config';
import { basename, join, parse, resolve } from 'path';
import { existsSync } from 'fs';
import { ExtVolInspectInfo, VolumeConfig, VolumeConfigType } from '../config.d/volume.config';
import Log from '../log';
import * as chalk from 'chalk';
import SubprocessWrapper from '../subprocess-wrapper';

enum ACTION {
  i = 'i', e = 'e', ls = 'ls'
}

export default class Volume extends Command {
  private docker = new Dockerode();
  static description = `Docker named volume tools
  Docker volume import/export tools with docker-compose project support
  scma volume ACTION [VOLUME_OR_PROJECT] [FILE_OR_DIR]

  Note: When all optional argument is missing and ACTION is not 'l', it will read ./${Config.json.config_file.volume} for config
  \tConfig file format:
  {
    type: VolumeConfigType; //VOLUME or PROJECT
    name?: string;
    path?: string;
}
  `;

  static args = [
    {
      name: 'action',
      description: `set work mode,
      \t'i' for import
      \t'e' for export
      \t'ls' for list`,
      options: Object.keys(ACTION),
      required: true,
      default: ACTION.ls,
    },
    {
      name: 'name',
      description: `volume or project name
      if using project mode,-p flag is needed`,
    },
    {
      name: 'path',
      description: `file or folder on host
      if using project mode,this should be a folder,and -p flag is needed`,
    },
  ];

  static flags = {
    project: flags.boolean({
      char: 'p',
      description: 'docker-compose project mode,do same action to all volume belong to same project',
    }),
    show_all: flags.boolean({
      char: 'a',
      description: 'show all, if not set or set to \'no\', only show volume with label',
      default: false,
      allowNo: true,
    }),
  };

  async do(volume: ExtVolInspectInfo, fullPath: string, action: ACTION) {
    const filename = basename(fullPath);
    const dir = parse(fullPath).dir;
    const dockerCMD = `docker run --rm -v ${dir}:/host -v ${volume.Name}:/target ubuntu`;
    let tarCMD = '';
    switch (action) {
      case ACTION.e:
        tarCMD = `tar -cvpf  /host/${filename} /target`;
        break;
      case ACTION.i:
        tarCMD = `tar --same-owner -xvpf  /host/${filename}`;
        break;
    }
    await new SubprocessWrapper([dockerCMD, tarCMD]);
  }

  static dcp = Config.json.const['docker-compose-project'];

  static cf = resolve(Config.json.config_file.volume);

  async run() {
    const { args, flags } = this.parse(Volume);
    let paramSource = args;
    const flagsSource = flags;
    if (args.action !== ACTION.ls && !args.name && !args.path) {       // try to load config file
      if (!existsSync(Volume.cf))
        Log.error('No enough argument and could not found a config file',
          '\nusage see: scma volume --help');
      const config: VolumeConfig = require(Volume.cf);
      Log.info('Using config file: ', Volume.cf);
      paramSource = config;
      switch (config.type) {
        case 'PROJECT':
          flagsSource.project = true;
          break;
        case 'VOLUME':
          flagsSource.project = false;
          break;
        default:
          Log.error('Wrong config file content', `${chalk.bgYellow.black('type')}@${Volume.cf}`);
      }
    }
    const name = paramSource.name ? paramSource.name : basename(resolve(process.cwd()));
    const path = paramSource.path ? paramSource.path : resolve(process.cwd());
    const type: VolumeConfigType = flagsSource.project ? 'PROJECT' : 'VOLUME';
    const allVolumeList: ExtVolInspectInfo[] = await this.docker.listVolumes().then(v => v.Volumes);
    let targets: ExtVolInspectInfo[] = allVolumeList;
    const groupedByComposeProject = _.groupBy(targets.filter(v => v.Labels), (v: ExtVolInspectInfo) => v.Labels[Volume.dcp]);

    switch (type) {
      case 'VOLUME':
        targets = targets.filter(v => {
          return v.Name.startsWith(name);
        });
        break;
      case 'PROJECT':
        if (!flagsSource.show_all)
          targets = targets.filter(v => v.Labels);
        if (flagsSource.project) {
          targets = groupedByComposeProject[name];
        }
        break;
    }

    if (!targets || targets.length === 0) {
      Log.error('Nothing to do/show');
    }
    console.table(
      targets.map(v => ({
        'Create Time': v.CreatedAt,
        Name: v.Name,
        'Docker-Compose Project': v.Labels && Volume.dcp in v.Labels ? v.Labels[Volume.dcp] : '',
      })),
    );
    if (args.action !== ACTION.ls) {
      targets.forEach(v => {
        const fullPath = join(resolve(path), `${v.Name}.tar`);
        this.do(v, fullPath, args.action);
      });
    }
  }
}
