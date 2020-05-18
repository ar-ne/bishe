import { Middleware } from '@nuxt/types';
import { socket } from '~/plugins/socket.client';
import { UserTrackInfo } from '~/generated/openapi';

const UserStateMonitor: Middleware = (context) => {
  socket.emit('Middleware/UserStateMonitor', {
    time: new Date().getTime(),
    action: {
      from: context.from.fullPath,
      to: context.route.fullPath,
    },
  } as UserTrackInfo);
};

export default UserStateMonitor;
