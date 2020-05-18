import {Model, model, property} from '@loopback/repository';

@model()
export class UserTrackAcrion extends Model {
  @property({
    type: 'string',
    required: true,
  })
  from: string;

  @property({
    type: 'string',
    required: true,
  })
  to: string;


  constructor(data?: Partial<UserTrackAcrion>) {
    super(data);
  }
}

export interface UserTrackAcrionRelations {
  // describe navigational properties here
}

export type UserTrackAcrionWithRelations = UserTrackAcrion & UserTrackAcrionRelations;
