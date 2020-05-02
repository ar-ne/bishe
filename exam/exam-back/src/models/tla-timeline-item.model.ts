import {Model, model, property} from '@loopback/repository';

@model()
export class TlaTimelineItem extends Model {
  @property({
    type: 'string',
  })
  action?: string;

  @property({
    type: 'number',
  })
  add?: number;

  @property({
    type: 'number',
  })
  del?: number;

  @property({
    type: 'number',
  })
  time?: number;


  constructor(data?: Partial<TlaTimelineItem>) {
    super(data);
  }
}

export interface TlaTimelineItemRelations {
  // describe navigational properties here
}

export type TlaTimelineItemWithRelations = TlaTimelineItem & TlaTimelineItemRelations;
