import {VolumeInspectInfo} from 'dockerode'

export interface VolumeConfig {
  type: VolumeConfigType;
  name: string;
  path: string;
}

export interface ExtVolInspectInfo extends VolumeInspectInfo {
  [key: string]: any;
}

export type VolumeConfigType = 'VOLUME' | 'PROJECT'

