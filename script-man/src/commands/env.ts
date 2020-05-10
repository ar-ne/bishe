import { Command, flags } from '@oclif/command';
import { resolve } from 'path';
import Log from '../log';
import { existsSync, readFileSync, writeFileSync } from 'fs';

interface Config {
  placeholders: string[];
  target: string;
  envs: {
    [key: string]: string;
  }
}

interface Placeholder {
  [placeholder: string]: string;
}

export default class Env extends Command {
  static description = `Generate env file from config file
  replace format: Key=Value
  Default config 'env.config.json'
  config format:
  interface Config {
    placeholders: string[];
    target: string;
    envs: {
      [key: string]: string;
    }
  }
  `;

  static flags = {
    replace: flags.string({
      char: 'r',
      multiple: true,
    }),
    file: flags.string({
      char: 'f',
      description: 'read placeholder value from file',
      default: 'env.placeholder.json',
    }),
    config: flags.string({
      char: 'c',
      description: 'config file',
      default: 'env.config.json',
    }),
    save: flags.boolean({
      char: 's',
      description: `save the placeholder config
      will overwrite current one
      if not exist will create as 'env.placeholder.json'`,
      default: true,
    }),
  };

  async run() {
    const { flags } = this.parse(Env);
    const config: Config = JSON.parse(readFileSync(resolve(flags.config), 'utf-8'));
    const placeholderKeys: string[] = [];
    const placeholders: Placeholder = {};

    if (existsSync(resolve(flags.file))) {
      const fileContent: Placeholder = JSON.parse(readFileSync(resolve(flags.file), 'utf-8'));
      Object.keys(fileContent).forEach(key => {
        placeholders[key] = fileContent[key];
        placeholderKeys.push(key);
      });
    }

    flags.replace?.forEach(r => {
      const pos = r.indexOf('=');
      if (pos == -1)
        Log.error('Not a valid key=value pair.');
      const vSplit = [r.substr(0, pos), r.substr(pos + 1)];
      placeholders[vSplit[0]] = vSplit[1];
      placeholderKeys.push(vSplit[0]);
    });

    const missed_key = config.placeholders.filter(value => !placeholderKeys.includes(value));
    if (missed_key.length > 0) {
      Log.info(`There're some placeholder is missing.`);
      Log.error('Missing key:' + missed_key);
    }

    //build envs
    const env: string[] = [];
    Object.keys(config.envs).forEach(key => {
      let value = config.envs[key];
      placeholderKeys.forEach(placeholder => {
        value = String(value).replace(placeholder, placeholders[placeholder]);
      });
      env.push(`${key}=${value}`);
    });

    writeFileSync(resolve(config.target), env.join('\n'));
    if (flags.save)
      writeFileSync(resolve(flags.file || 'env.placeholder.json'), JSON.stringify(placeholders, null, 2));
  }
}
