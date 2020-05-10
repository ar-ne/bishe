import SubprocessWrapper from './subprocess-wrapper';

const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const base_cmd = '';

export interface Config {
  outDir: string;
  generator: string;
  configPath: string;

  [key: string]: any;
}


const loadConfig = (): Config[] => {
  const cfgDir = path.join(__dirname, 'config.d');
  const cfgFiles: string[] = (fs.readdirSync(cfgDir)).map((v: string) => path.join(cfgDir, v));
  return cfgFiles.map(value => {
    return {
      configPath: value,
      ...JSON.parse(fs.readFileSync(value)),
    };
  });
};

const createCMD = (configs: Config[]): string[] => {
  return configs.map(config => {
    return `yarn run openapi-generator generate -g ${config.generator} -i ${path.join(__dirname,'../openapi.json')} -o ${path.resolve(config.outDir)} -c ${config.configPath}`;
  });
};

const gen = () => {
  createCMD(loadConfig()).forEach(value => new SubprocessWrapper(value));
};

gen();
