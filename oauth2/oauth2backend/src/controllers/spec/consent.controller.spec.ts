import { OpenApiBuilder } from 'openapi3-ts';
import { Header } from '../../constants';
import { ConsentRequest } from '@oryd/hydra-client/dist/model/consentRequest';
import { HydraPropertiesSpecGenerator } from '../../utils';


const builder = OpenApiBuilder.create().addPath('/', {
  get: {
    responses: {
      default: {
        description: '前端发起请求时返回consent detail',
        content: {
          'application/json': {
            schema: {
              title: 'detail',
              properties: HydraPropertiesSpecGenerator(ConsentRequest.getAttributeTypeMap()),
            },
          },
        },
      },
      '302': {
        description: '重定向到前端或由hydra决定的重定向地址',
      },
    },
  },
  post: {
    parameters: [
      {
        name: Header.applicationRequesting,
        in: 'header',
        schema: { type: 'string' },
      },
    ],
    responses: {
      default: {
        description: 'Consent请求的结果',
        content: {
          'application/json': {
            schema: {
              title: 'body',
              properties: {
                success: { type: 'boolean' },
                error: { type: 'string', nullable: true },
                errorDescription: { type: 'string', nullable: true },
                redirect: { type: 'string', nullable: false },
              },
            },
          },
        },
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'body',
            properties: {
              challenge: {
                title: 'challenge',
                type: 'string',
                nullable: false,
              },
              submit: {
                title: 'submit',
                type: 'boolean',
                nullable: false,
              },
              scope: {
                title: 'scope',
                type: 'array',
                items: {
                  type: 'string',
                },
                nullable: false,
              },
              remember: {
                title: 'remember',
                type: 'boolean',
                nullable: false,
              },
            },
          },
        },
      },
    },
  },
});

export const spec = { ...builder.getSpec(), basePath: '/consent' };
