// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


import { HydraAbstractController } from './hydra.abstract-controller';
import { api, get, param, post, requestBody } from '@loopback/openapi-v3';
import { Query } from '../constants';
import { spec } from './spec/logout.controller.spec';

@api(spec)
export class LogoutController extends HydraAbstractController {
  @get('/', spec.paths['/'].get)
  async getSlash(
    @param.query.string(Query.logoutChallenge, { required: true })
      challenge: string,
  ) {
    // const lr = this.hydraService.adminApi.getLogoutRequest(challenge).then(value => value.body);
    // The most secure way to perform a logout request is by asking the user if he/she really want to log out.
    return this.redirectTo(`${this.frontRoot}/logout/?challenge=${challenge}`);
  };

  @post('/', spec.paths['/'].post)
  async postSlash(
    @requestBody(spec.paths['/'].post.requestBody)
      body: {
      challenge: string,
      submit: boolean
    },
  ) {
    const { challenge, submit } = body;
    if (!submit) {
      // The user did not want to log out. Let's redirect him back somewhere or do something else.
      const v1 = await this.hydraService.rejectLogoutRequest(challenge).then(value => value.body);
      return {
        success: false,
        message: v1,
      };
    }
    const v1 = await this.hydraService.acceptLogoutRequest(challenge).then(value => value.body);
    return {
      success: true,
      redirect: v1.redirectTo,
    };
  }
}
