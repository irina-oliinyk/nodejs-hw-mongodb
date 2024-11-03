import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import { loger } from './middlewares/loger.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());

  app.use(loger);

  app.use(contactsRouter);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
