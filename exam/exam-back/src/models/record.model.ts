import {Entity, model, property} from '@loopback/repository';

@model()
export class Record extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  answerID: number;

  @property({
    type: 'string',
    required: true,
  })
  startTime: string;

  @property({
    type: 'string',
    required: true,
  })
  endTime: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  timeline: string[];


  constructor(data?: Partial<Record>) {
    super(data);
  }
}

export interface RecordRelations {
  // describe navigational properties here
}

export type RecordWithRelations = Record & RecordRelations;
