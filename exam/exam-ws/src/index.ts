require('dotenv').config();
import { clog } from './utils';
import wsInit from './websocket';
import router from './router';
import { app, client, http, io } from './server';

client.on('error', (err) => clog(`RedisError:${err}`));
io.on('connection', wsInit(client));

http.listen(3001, () => {
  clog('listening on *:3001');
});
app.use('/', router);

export default app;
