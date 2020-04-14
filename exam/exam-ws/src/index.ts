require('dotenv').config();
import { createServer } from 'http';
import express from 'express';
import { Socket } from 'socket.io';
import { parse } from './cookie.parse';
import { Record, RecordControllerApi } from './generated/openapi';
import { apiConfig } from './api-config';

const app = express();
const http = createServer(app);
const io = require('socket.io')(http);
io.on('connection', (socket: Socket) => {
  const cookie = parse(socket.client.request.headers.cookie);
  let record = {} as Record;
  console.log(`${socket.id} connected, user: ${cookie.io}`);

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on('Middleware/UserStateMonitor', (dat) => {
    console.log(cookie.io, JSON.parse(dat));
  });

  socket.on('MonacoEditor', (dat) => {
    const d: { type: string, value: string, event: any, time: Date } = JSON.parse(dat);
    console.log(cookie.io, `${d.time}|MonacoEditor/${d.type}`);
    record.timeline.push(dat);
  });

  socket.on('editor/submit', async (dat) => {
    console.log(cookie.io, JSON.parse(dat));
    record.endTime = String(new Date().getTime());
    record.answerID = dat;
    await new RecordControllerApi(apiConfig).recordControllerCreate(record)
      .then(v => socket.emit('onSuccess', v.data.answerID)).catch(reason => console.log(reason.stack));
  });
  socket.on('editor/create', (dat) => {
    console.log(cookie.io, 'editor/create');
    record = {
      answerID: -1,
      timeline: [],
      endTime: '',
      startTime: String(new Date().getTime()),
    };
  });

  socket.on('msg', (msg: string) => {
      console.log(`${socket.id}:msg=${msg}`);
    },
  );
});

http.listen(3001, () => {
  console.log('listening on *:3001');
});
