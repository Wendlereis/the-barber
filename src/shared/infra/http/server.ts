import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import cors from 'cors';

import routes from './routes';

import fileUploadConfig from '@config/fileUpload';
import exceptionMiddleware from '@shared/infra/http/middlewares/exceptionMiddleware';

import '@shared/infra/database';
import '@shared/container';

const app = express();

app.use(express.json());
app.use('/files', express.static(fileUploadConfig.destination));
app.use(cors());
app.use(routes);
app.use(exceptionMiddleware);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`app listen in port ${port}`));
