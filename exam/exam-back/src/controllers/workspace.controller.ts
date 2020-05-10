import { FilterExcludingWhere, repository } from '@loopback/repository';
import { del, get, getModelSchemaRef, param, post } from '@loopback/rest';
import { WorkspaceSession } from '../models';
import { TemplateRepository, WorkspaceSessionRepository } from '../repositories';
import { service } from '@loopback/core';
import { DockerService } from '../services';
import { redisService } from '../redis-service';

export class WorkspaceController {
  constructor(
    @repository(WorkspaceSessionRepository)
    public wsp: WorkspaceSessionRepository,
    @service(DockerService)
    private dockerService: DockerService,
    @repository(TemplateRepository)
    public tr: TemplateRepository,
  ) {
  }

  @post('/workspace-sessions', {
    responses: {
      '200': {
        description: 'WorkspaceSession model instance',
        content: { 'application/json': { schema: getModelSchemaRef(WorkspaceSession) } },
      },
    },
  })
  async getContainer(
    @param.header.string('Authorization', { required: true })
      token: string,
    @param.query.boolean('enableTrack', { required: true })
      enableTrack: boolean,
    @param.query.string('templateName', { required: false })
      templateName?: string,
  ):

    Promise<WorkspaceSession> {
    const exists = await this.wsp.exists(token);
    const workspaceSession = exists ? await this.wsp.findById(token) : new WorkspaceSession();

    if (!exists) {//若不存在与该token绑定的session
      workspaceSession.token = token;
      workspaceSession.enableTrack = enableTrack;
      if (templateName) {
        const template = await this.tr.findById(templateName);
        workspaceSession.projectArchive = template?.content;
      }
      await this.wsp.create(workspaceSession);
    }

    const network = await this.dockerService.network;
    const container = await this.dockerService.getContainer(workspaceSession);
    const inspectInfo = await container.inspect();
    workspaceSession.containerID = inspectInfo.Id;
    workspaceSession.address = inspectInfo.NetworkSettings.Networks[network.Name].IPAddress;


    //返回WorkspaceSession
    await this.wsp.update(workspaceSession);
    redisService.setContainer(workspaceSession);
    return workspaceSession;
  }

  @get('/workspace-sessions/{id}', {
    responses: {
      '200': {
        description: 'WorkspaceSession model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(WorkspaceSession, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(WorkspaceSession, { exclude: 'where' }) filter?: FilterExcludingWhere<WorkspaceSession>,
  ): Promise<WorkspaceSession> {
    return this.wsp.findById(id, filter);
  }

  @del('/workspace-sessions/{id}', {
    responses: {
      '204': {
        description: 'WorkspaceSession DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.wsp.deleteById(id);
  }
}
