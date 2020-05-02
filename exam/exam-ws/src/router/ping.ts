import express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
  res.send({
    data: 'pong',
    time: new Date().getTime(),
  });
});

export default router;
