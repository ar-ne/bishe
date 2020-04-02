import { Response, RestApplication, RestBindings } from '@loopback/rest';
import { inject, service } from '@loopback/core';
import { LoggingBindings, WinstonLogger } from '@loopback/extension-logging';
import { HydraService } from '../services';
import { repository } from '@loopback/repository';
import { UserCredentialRepository } from '../repositories';

export class HydraAbstractController extends RestApplication {
  protected readonly frontRoot: string;
  @inject(LoggingBindings.WINSTON_LOGGER)
  protected readonly logger: WinstonLogger;

  constructor(
    @service()
    protected hydraService: HydraService,
    @repository(UserCredentialRepository)
    protected userCredential: UserCredentialRepository,
    @inject(RestBindings.Http.RESPONSE)
    protected response: Response) {
    super();
    if (process.env.FRONT_ROOT)
      this.frontRoot = process.env.FRONT_ROOT;
    else {
      throw new Error('FRONT_ROOT not defined in env');
    }
  }

  redirectTo(target: string, status = 302): string {
    this.response.status(status);
    this.response.location(target);
    return `redirect to ${target}`;
  }

  illegalRequest() {
    throw new IllegalRequest();
  }
}

class IllegalRequest extends Error {
  constructor() {
    super('illegal request');
  }
}
