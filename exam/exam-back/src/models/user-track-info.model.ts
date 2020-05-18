import { Model, model, property } from '@loopback/repository';
import { UserTrackAcrion } from './user-track-acrion.model';

@model()
export class UserTrackInfo extends Model {
  @property({
    type: 'number',
    required: true,
  })
  time: string;

  @property({ ...UserTrackAcrion, required: true })
  action: UserTrackAcrion;


  constructor(data?: Partial<UserTrackInfo>) {
    super(data);
  }
}

export interface UserTrackInfoRelations {
  // describe navigational properties here
}

export type UserTrackInfoWithRelations = UserTrackInfo & UserTrackInfoRelations;
