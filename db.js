import mongoose from 'mongoose';
import config from './config';
import {
  logger,
} from './log';

mongoose.connect(config.db.url, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on('error', logger.error.bind(console, 'connection error:'));

db.once('open', () => {
  logger.log('Connection Successful!');
});
