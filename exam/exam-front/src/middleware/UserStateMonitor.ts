import { Middleware } from '@nuxt/types';
import { socket } from '~/plugins/socket.client';

const UserStateMonitor: Middleware = (context) => {
  socket.emit('Middleware/UserStateMonitor', JSON.stringify({
    from: context.from.fullPath,
    to: context.route.fullPath,
  }));
};

export default UserStateMonitor;
