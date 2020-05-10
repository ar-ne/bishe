import { Entity, model, property } from '@loopback/repository';

export const DockerLabels = {
  token: 'exam.workspace.token',
};

@model()
export class WorkspaceSession extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  token: string;

  @property({
    type: 'string',
  })
  containerID?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property(
    { type: 'string' },
  )
  projectArchive?: string;

  @property({ type: 'boolean', required: true })
  enableTrack: boolean;

  constructor(data?: Partial<WorkspaceSession>) {
    super(data);
  }
}

export interface WorkspaceSessionRelations {
  // describe navigational properties here
}

export type WorkspaceSessionWithRelations = WorkspaceSession & WorkspaceSessionRelations;
