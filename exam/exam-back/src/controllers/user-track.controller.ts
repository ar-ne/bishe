import { get, getModelSchemaRef } from '@loopback/rest';
import { RedisService } from '../redis-service';
import { UserTrack } from '../models';

export class UserTrackController {
  constructor(
    private redisService: RedisService,
  ) {
  }

  @get('/user-tracks', {
    responses: {
      '200': {
        description: 'Array of UserTrack model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserTrack),
            },
          },
        },
      },
    },
  })
  async getAll(): Promise<UserTrack[]> {
    return [new UserTrack({ user: 'example' })];
  }

  //
  // @get('/user-tracks/{id}', {
  //   responses: {
  //     '200': {
  //       description: 'UserTrack model instance',
  //       content: {
  //         'application/json': {
  //           schema: getModelSchemaRef(UserTrack, { includeRelations: true }),
  //         },
  //       },
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.number('id') id: number,
  //   @param.filter(UserTrack, { exclude: 'where' }) filter?: FilterExcludingWhere<UserTrack>,
  // ): Promise<UserTrack> {
  //   return this.userTrackRepository.findById(id, filter);
  // }
}
