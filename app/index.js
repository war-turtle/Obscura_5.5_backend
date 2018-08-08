import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import config from '../config';
import routes from './routes';
import {
  stream,
  logger,
} from '../log';

const swaggerJSDoc = require('swagger-jsdoc');

// Initiating app instance
const app = express();
console.log(path.join(__dirname, 'pulbic'));
app.use(express.static(path.join(__dirname, 'pulbic')));

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:3000',
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./**/routes/*.js', 'routes.js'], // pass all in array

};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

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
