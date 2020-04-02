import { api, get, param, post, requestBody } from '@loopback/rest';
import { spec } from './spec/login.controller.spec';
import { HydraAbstractController } from './hydra.abstract-controller';
import { Header, Query } from '../constants';

@api(spec)
export class LoginController extends HydraAbstractController {

  @get('/', spec.paths['/'].get)
  async getSlash(
    @param.query.string(Query.loginChallenge, { required: true })
      challenge: string,
  ) {
    const glr = await this.hydraService.getLoginRequest(challenge);
    if (glr.body.skip) {
      const alr = await this.hydraService.acceptLoginRequest(challenge, { subject: glr.body.subject! });
      return this.redirectTo(alr.body.redirectTo!);
    }
    return this.redirectTo(`${this.frontRoot}/?challenge=${challenge}`);
  }

  @post('/', spec.paths['/'].post)
  async postSlash(
    @requestBody(spec.paths['/'].post.requestBody)
      body: {
      challenge: string,
      username: string,
      password: string,
      remember: boolean
    },
    @param.header.boolean(Header.applicationRequesting)
      applicationRequesting: boolean,
  ) {
    const { username, password, challenge, remember } = body;
    //query db to check if username&password is correct
    const user = await this.userCredential.find({
      where: {
        username: username,
        password: password,
      },
    });

    if (!applicationRequesting || !challenge)
      this.illegalRequest();

    if (user.length === 0) {
      //not correct
      return { success: false, message: '用户名或密码错误' };
    }
    return this.hydraService.acceptLoginRequest(challenge, {
      subject: username,
      remember: remember,
      rememberFor: 3600,
    }).then(value => {
      return { success: true, redirect: value.body.redirectTo };
    }).catch(reason => {
      this.logger.warn(reason);
      return { success: false, message: 'Something wrong with the other side' };
    });

    // You could also deny the login request which tells hydra that no one authenticated!
    // hydra.rejectLoginRequest(challenge, {
    //   error: 'invalid_request',
    //   error_description: 'The user did something stupid...'
    // })
    //   .then(function (response) {
    //     // All we need to do now is to redirect the browser back to hydra!
    //     res.redirect(response.redirect_to);
    //   })
    //   // This will handle any error that happens when making HTTP calls to hydra
    //   .catch(function (error) {
    //     next(error);
    //   });
  }

}
