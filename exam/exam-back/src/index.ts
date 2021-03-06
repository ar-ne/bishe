require('dotenv').config();
import { ExamBackApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import fetch from 'node-fetch';
import * as fs from 'fs';
import { client } from './redis-service';

export { ExamBackApplication };

export async function main(options: ApplicationConfig = {}) {
  client.on('error', (err) => console.log(`RedisError:${err}`));
  const app = new ExamBackApplication(options);
  await app.boot();
  await app.start();
  await app.migrateSchema();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  await exportOpenApiSpecJSON(`http://localhost:3000`);
  return app;
}

const exportOpenApiSpecJSON = async (url: string) => {
  try {
    const openApiSpec = await fetch(`${url}/openapi.json`).then(value => value.json());
    fs.writeFileSync('openapi.json', JSON.stringify(openApiSpec, null, 2), { encoding: 'utf-8' });
    console.log(`openapi.json updated from ${url}/openapi.json`);
  } catch (e) {
    console.log('openapi.json update failed.');
    // await exportOpenApiSpecJSON(url);
  }

};
