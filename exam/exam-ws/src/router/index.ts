import express from 'express';
import ping from './ping';
import wellKnown from './well-known';

const router = express.Router();

router.use('/ping', ping);
router.use('/well-known', wellKnown);

router.use('/', (req, res) => {
  res.send('Hello');
});
export default router;
