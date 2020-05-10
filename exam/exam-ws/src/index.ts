import { clog } from './utils';
import router from './router';
import { app, client, http } from './server';
import { wsInit } from './websocket/ws-utils';
import { wsNamespaces } from './websocket';

require('dotenv').config();

client.on('error', (err) => clog(`RedisError:${err}`));

Object.keys(wsNamespaces).forEach(async (value) => {
  const { nsp, init } = wsNamespaces[value];
  nsp.on('connection', (socket) => wsInit(client, socket, init));
});

http.listen(3001, () => {
  clog('listening on *:3001');
});
app.use('/', router);

export default app;
