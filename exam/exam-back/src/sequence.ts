import { inject } from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import { service } from '@loopback/core';
import { HydraService } from './services';

const SequenceActions = RestBindings.SequenceActions;
const publicPaths = ['/openapi.json', '/explorer'];

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @service() private hydraService: HydraService,
  ) {
  }

  async handle(context: RequestContext) {
    try {
      const { request, response } = context;
      let acc = true;
      // if (publicPaths.includes(request.path)) acc = true;
      // else {
      //   const token = request.header('Authorization')?.split(' ')[1];
      //   if (token !== undefined) {
      //     const introspection = await this.hydraService
      //       .introspectOAuth2Token(token).then(value => value.body);
      //     acc = introspection.active;
      //   }
      // }
      if (acc) {
        const route = this.findRoute(request);
        const args = await this.parseParams(request, route);
        const result = await this.invoke(route, args);
        this.send(response, result);
      } else {
        this.reject(context, new Error('500'));
      }
    } catch (err) {
      this.reject(context, err);
    } finally {
      const { request, response } = context;
      console.log(`${response.statusCode}\t${request.method}\t${request.url}`);
    }
  }
}
