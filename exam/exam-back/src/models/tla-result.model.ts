import { Model, model, property } from '@loopback/repository';
import { TlaTimelineItem } from './tla-timeline-item.model';

@model()
export class TlaResult extends Model {
  @property({
    type: 'number',
  })
  add?: number;

  @property({
    type: 'number',
  })
  del?: number;

  @property.array(TlaTimelineItem)
  timeline?: TlaTimelineItem[];

  @property({
    type: 'number',
  })
  undo?: number;

  @property({
    type: 'number',
  })
  paste?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TlaResult>) {
    super(data);
  }
}

export interface TlaResultRelations {
  // describe navigational properties here
}

export type TlaResultWithRelations = TlaResult & TlaResultRelations;
