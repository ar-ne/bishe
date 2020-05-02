import express from 'express';
import { emits, rooms } from '../utils/constants';

const router = express.Router();

router.use('/', (req, res) => {
  res.send({ rooms,emits });
});

export default router;
