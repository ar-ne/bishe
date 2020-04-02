import {OpenApiBuilder} from 'openapi3-ts';

const builder = OpenApiBuilder.create()
  .addPath('/', {
    get: {
      responses: {
        default: {
          description: '重定向到登陆页面或从hydra返回的地址',
          headers: {
            Location: {
              description: '重定向目标地址',
              schema: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    post: {
      responses: {
        default: {
          description: '如果success字段的值为false，则说明身份认证不通过，并且会同时返回一个message字段表示原因，否则应包含redirect字段',
          content: {
            'application/json': {
              schema: {
                properties: {
                  success: {
                    type: 'boolean',
                    description: '表示认证是否成功',
                  },
                  message: {
                    type: 'string',
                    description: '认证失败时的消息',
                  },
                  redirect: {
                    type: 'string',
                    description: '认证成功时的重定向位置',
                  },
                },
              },
            },
          },
        },
      },
      requestBody: {
        description: 'post请求应包括用户名密码以及challenge和是否记住登录',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {type: 'string', nullable: false},
                password: {type: 'string', nullable: false},
                challenge: {type: 'string', nullable: false},
                remember: {type: 'boolean', nullable: false},
              },
            },
          },
        },
      },
    },
  });
export const spec = {...builder.getSpec(), basePath: '/login'};
