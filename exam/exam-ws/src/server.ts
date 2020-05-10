import express from 'express';
import { createServer } from 'http';
import Redis from 'ioredis';

export const app = express();
export const http = createServer(app);
export const io = require('socket.io')(http);
export const client = new Redis(6379, process.env.REDIS_HOST || 'localhost');
