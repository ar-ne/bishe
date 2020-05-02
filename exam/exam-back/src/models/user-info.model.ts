import { Entity, model, property } from '@loopback/repository';

@model()
export class UserInfo extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;


  constructor(data?: Partial<UserInfo>) {
    super(data);
  }
}

export interface UserInfoRelations {
  // describe navigational properties here
}

export type UserInfoWithRelations = UserInfo & UserInfoRelations;
