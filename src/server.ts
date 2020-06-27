import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';

import fileUploadConfig from './config/fileUpload';
import exceptionMiddleware from './middlewares/exceptionMiddleware';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(fileUploadConfig.destination));
app.use(routes);
app.use(exceptionMiddleware);

app.listen(3333, () =>
  console.log('app listen in port https://localhost:3333'),
);
