import { Model, model, property } from '@loopback/repository';
import { UserTrackInfo } from './user-track-info.model';

@model()
export class UserTrack extends Model {
  @property({ type: 'string', required: true })
  user: string;
  @property.array(UserTrackInfo, { required: true })
  timeline: UserTrackInfo[];


  constructor(data?: Partial<UserTrack>) {
    super(data);
  }
}

export interface UserTrackRelations {
  // describe navigational properties here
}

export type UserTrackWithRelations = UserTrack & UserTrackRelations;
