import pino from 'pino-http';

export const loger = () => {
  pino({
    transport: {
      target: 'pino-pretty',
    },
  });
};
