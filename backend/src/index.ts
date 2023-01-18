import mongoose from 'mongoose';
import * as config from './config/global';

import server from './app';

process.on('uncaughtException', async (err) => {
  console.log(err.message);
  process.exit(1);
});

mongoose.connect(config.mongo_url).then(() => {
  console.log('Connected to MongoDB');

  server.listen(config.port, () => {
    console.log(`Listening to port: ${config.port}`);
    console.log(`NODE_ENV: ${config.env}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
