import { OpenApiBuilder } from 'openapi3-ts';

const builder = OpenApiBuilder.create().addPath('/', {
  post: {
    responses: {
      default: {
        description: 'Logout操作的结果',
      },
    },
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              challenge:{type:'string',nullable:false},
              submit:{type:'boolean',nullable:false},
            },
          },
        },
      },
    },
  },
});

export const spec = { ...builder.getSpec(), basePath: '/logout' };
