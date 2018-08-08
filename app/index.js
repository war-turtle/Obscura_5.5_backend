import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from '../config';
import routes from './routes';
import {
  stream, logger,
} from '../log';

// Initiating app instance
const app = express();

// Connecting to database
mongoose.connect(config.db.url, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', logger.error.bind(logger, 'connection error:'));
db.once('open', () => {
  logger.info('Connection Successful!');
});

// Routes
app.use('/', routes);

// Middlewares
app.use(morgan('combined', {
  stream,
}));
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());


app.use((req, res) => {
  res.status(404).send({
    url: `${req.originalUrl} not found`,
  });
});

app.listen(config.app.port);
// https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
