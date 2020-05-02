import { service } from '@loopback/core';
import { HydraService } from '../services';
import { get, getModelSchemaRef, param } from '@loopback/rest';
import { UserInfo } from '../models';

export class UserController {
  constructor(
    @service()
    protected hydraService: HydraService) {
  }

  @get('/userinfo', {
    responses: {
      '200': {
        description: 'UserInfo model instance',
        content: { 'application/json': { schema: getModelSchemaRef(UserInfo) } },
      },
    },
  })
  async userinfo(
    @param.header.string('Authorization')
      token: string,
  ) {
    const i = await this.hydraService.introspectOAuth2Token(token.split(' ')[1]).then(v => v.body);
    if (!i.active)
      throw new Error('403');
    return i.ext!['userinfo'];
  }
}
