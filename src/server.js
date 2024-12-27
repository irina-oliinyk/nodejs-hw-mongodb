import express from 'express';

import router from './routers/index.js';
import cors from 'cors';
import { env } from './utils/env.js';
// import { logger } from './middlewares/loger.js';
// import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { swaggerDocs } from './middlewares/swaggerDocs.js';

import path from 'node:path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use('/avatars', express.static(path.resolve('src/public/avatars')));

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());

  app.use(cookieParser());

  // app.use(logger);

  // app.use('/contacts', contactsRouter);
  app.use(router);

  // app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
