import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TimelineAnalysis} from '../models';
import {TimelineAnalysisRepository} from '../repositories';

export class TlAnalysisController {
  constructor(
    @repository(TimelineAnalysisRepository)
    public timelineAnalysisRepository : TimelineAnalysisRepository,
  ) {}

  @post('/timeline-analyses', {
    responses: {
      '200': {
        description: 'TimelineAnalysis model instance',
        content: {'application/json': {schema: getModelSchemaRef(TimelineAnalysis)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimelineAnalysis, {
            title: 'NewTimelineAnalysis',
            
          }),
        },
      },
    })
    timelineAnalysis: TimelineAnalysis,
  ): Promise<TimelineAnalysis> {
    return this.timelineAnalysisRepository.create(timelineAnalysis);
  }

  @get('/timeline-analyses/count', {
    responses: {
      '200': {
        description: 'TimelineAnalysis model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TimelineAnalysis) where?: Where<TimelineAnalysis>,
  ): Promise<Count> {
    return this.timelineAnalysisRepository.count(where);
  }

  @get('/timeline-analyses', {
    responses: {
      '200': {
        description: 'Array of TimelineAnalysis model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TimelineAnalysis, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TimelineAnalysis) filter?: Filter<TimelineAnalysis>,
  ): Promise<TimelineAnalysis[]> {
    return this.timelineAnalysisRepository.find(filter);
  }

  @patch('/timeline-analyses', {
    responses: {
      '200': {
        description: 'TimelineAnalysis PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimelineAnalysis, {partial: true}),
        },
      },
    })
    timelineAnalysis: TimelineAnalysis,
    @param.where(TimelineAnalysis) where?: Where<TimelineAnalysis>,
  ): Promise<Count> {
    return this.timelineAnalysisRepository.updateAll(timelineAnalysis, where);
  }

  @get('/timeline-analyses/{id}', {
    responses: {
      '200': {
        description: 'TimelineAnalysis model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TimelineAnalysis, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TimelineAnalysis, {exclude: 'where'}) filter?: FilterExcludingWhere<TimelineAnalysis>
  ): Promise<TimelineAnalysis> {
    return this.timelineAnalysisRepository.findById(id, filter);
  }

  @patch('/timeline-analyses/{id}', {
    responses: {
      '204': {
        description: 'TimelineAnalysis PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TimelineAnalysis, {partial: true}),
        },
      },
    })
    timelineAnalysis: TimelineAnalysis,
  ): Promise<void> {
    await this.timelineAnalysisRepository.updateById(id, timelineAnalysis);
  }

  @put('/timeline-analyses/{id}', {
    responses: {
      '204': {
        description: 'TimelineAnalysis PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() timelineAnalysis: TimelineAnalysis,
  ): Promise<void> {
    await this.timelineAnalysisRepository.replaceById(id, timelineAnalysis);
  }

  @del('/timeline-analyses/{id}', {
    responses: {
      '204': {
        description: 'TimelineAnalysis DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.timelineAnalysisRepository.deleteById(id);
  }
}
