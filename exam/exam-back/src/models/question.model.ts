import { Entity, model, property } from '@loopback/repository';

@model()
export class Question extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  author?: string;

  @property({
    type: 'string',
  })
  score?: string;

  @property({
    type: 'string',
  })
  brief?: string;

  @property({
    type: 'string',
    required: true,
  })
  detail: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  examples?: {
    input: string,
    output: string
  }[];

  @property({
    type: 'number',
  })
  examination?: number;

  @property({
    type: 'string',
  })
  templateName?: string;


  constructor(data?: Partial<Question>) {
    super(data);
  }
}

export interface QuestionRelations {
  // describe navigational properties here
}

export type QuestionWithRelations = Question & QuestionRelations;
