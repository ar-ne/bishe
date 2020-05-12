import { WSCallback, WSCallback_ARG } from '../types';
import { AnswerControllerApi, NewAnswer, NewTemplate, TemplateControllerApi } from '../../generated/openapi';
import { apiConfig } from '../../api-config';
import { WSClients } from '../ws-utils';

//后端与插件通信
export const CLIENT = (
  { redis, user, socket, record }: WSCallback_ARG): WSCallback[] => {
  return [{
    event: 'submit/answer/uploaded',
    callback: async (logger, { file, question }: { file: string; question: number }) => {
      logger('');
      const ans = await new AnswerControllerApi(apiConfig(user.token))
        .answerControllerCreate(new class implements NewAnswer {
          question = question;
          content = file;
          user = user.name;
        }).then(v => v.data);

      const record = await redis.Record().submit(ans.id!, String(new Date().getTime()));

      await socket.emit('submit/answer/done', JSON.stringify(ans));
      await WSClients.FRONT.get(user.token)?.forEach(value => {
        value.emit('answerSuccess', ans.id);
      });
    },
  }, {
    event: 'submit/template/uploaded',
    callback: async (logger, { file, name }: { file: string; name: string }) => {
      logger('');
      const template = await new TemplateControllerApi(apiConfig(user.token))
        .templateControllerCreate(new class implements NewTemplate {
          name = name;
          content = file;
        }).then(v => v.data);

      await socket.emit('submit/template/done', JSON.stringify(template));
      await WSClients.FRONT.get(user.token)?.forEach(value => {
        value.emit('templateSuccess', template.name);
      });
    },
  },
    ...EditorEvents({ redis, user, socket, record }),
  ];
};

const EditorEvents = (
  { redis, user, socket }: WSCallback_ARG): WSCallback[] => {
  const data: WSCallback[] = [
    {
      event: 'onDidChangeActiveTextEditor',
      callback: async (logger, file: string) => {
        logger(file);
        await redis.Record().update(JSON.stringify({
          event: 'onDidChangeActiveTextEditor',
          file,
        }));
      },
    },
    {
      event: 'recordUpdate',
      callback: async (logger, dat) => {
        logger(dat);
        await redis.Record().update(dat);
      },
    },
  ];
  return data.map(v => {
    v.event = 'editor/' + v.event;
    return v;
  });
};
