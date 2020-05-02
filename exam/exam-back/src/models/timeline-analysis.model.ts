import { Entity, model, property } from '@loopback/repository';
import { TlaResult } from './tla-result.model';

@model()
export class TimelineAnalysis extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  record: number;

  @property({
    type: 'boolean',
    required: true,
    default: false,
  })
  finished: boolean;

  @property(TlaResult)
  result?: TlaResult;


  constructor(data?: Partial<TimelineAnalysis>) {
    super(data);
  }
}

export interface TimelineAnalysisRelations {
  // describe navigational properties here
}

export type TimelineAnalysisWithRelations = TimelineAnalysis & TimelineAnalysisRelations;
