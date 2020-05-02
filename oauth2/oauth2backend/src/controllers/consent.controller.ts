import { HydraAbstractController } from './hydra.abstract-controller';
import { api, get, param, post, requestBody } from '@loopback/openapi-v3';
import { spec } from './spec/consent.controller.spec';
import { Header, Query } from '../constants';

@api(spec)
export class ConsentController extends HydraAbstractController {
  @get('/', spec.paths['/'].get)
  async getSlash(
    @param.query.string(Query.consentChallenge, { required: true })
      challenge: string,
    @param.header.boolean(Header.applicationRequesting)
      applicationRequesting: boolean,
  ) {
    const detail = await this.hydraService.getConsentRequest(challenge).then(v => v.body);
    //if is application requesting, we should treat that is querying the consent detail

    if (Number(process.env.SSO_MODE)) {
      const preRequest = await this.hydraService.getConsentRequest(challenge).then(v => v.body);
      const user = await this.userRepository.findById(preRequest.subject!);
      const accept = await this.hydraService.acceptConsentRequest(challenge, {
        grantScope: detail.requestedScope,
        session: {
          accessToken: {
            userinfo: { role: user.role, name: user.name },
          },
        },
        grantAccessTokenAudience: preRequest.requestedAccessTokenAudience,
        remember: true,
        rememberFor: 3600,
      }).then(v => v.body);
      return this.redirectTo(accept.redirectTo!);
    }

    if (applicationRequesting) return detail;

    if (detail.skip) {
      // If a user has granted this application the requested scope, hydra will tell us to not show the UI.
      const v2 = await this.hydraService.acceptConsentRequest(challenge, {
        grantScope: detail.requestedScope,
        grantAccessTokenAudience: detail.requestedAccessTokenAudience,
        session: {},
      }).then(v => v.body);
      return this.redirectTo(v2.redirectTo!);
    }
    // If consent can't be skipped we MUST show the consent UI.
    return this.redirectTo(`${this.frontRoot}/consent?challenge=${challenge}`);
  }

  @post('/', spec.paths['/'].post)
  async postSlash(
    @requestBody(spec.paths['/'].post.requestBody)
      { challenge, submit, scope, remember }: {
      challenge: string,
      submit: boolean,
      scope: string[],
      remember: boolean
    },
    @param.header.boolean(Header.applicationRequesting)
      applicationRequesting: boolean,
  ): Promise<{
    success: boolean;
    redirect: string;
    error?: string;
    errorDescription?: string;
  }> {
    if (!challenge || !applicationRequesting) {
      this.illegalRequest();
    }
    if (!submit) {
      const message = {
        error: 'access_denied',
        errorDescription: '用户拒绝了请求',
      };
      const reject = await this.hydraService.rejectConsentRequest(challenge, message).then(v => v.body);
      return {
        success: false,
        redirect: reject.redirectTo!,
        ...message,
      };
    } else {
      const preRequest = await this.hydraService.getConsentRequest(challenge).then(v => v.body);
      const accept = await this.hydraService.acceptConsentRequest(challenge, {
        grantScope: scope,
        session: {},
        grantAccessTokenAudience: preRequest.requestedAccessTokenAudience,
        remember: remember,
        rememberFor: 3600,
      }).then(v => v.body);
      return {
        success: true,
        redirect: accept.redirectTo!,
      };
    }
  }
}
