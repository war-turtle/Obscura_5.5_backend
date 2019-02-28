// Middleware for Application
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import CsrfMiddleware from './global/middlewares/csrfMidlleware';
import EmptyContentMiddleware from './global/middlewares/EmptyContent';
import ContentTypeMiddleware from './global/middlewares/ContentType';
import configServer from '../config';
import { stream } from '../log';

const cron = require('node-cron');

// const JsonStore = require('express-session-json')(expressSession);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const store = new MongoStore({ url: configServer.db.url });

const middleware = (app) => {
  app.set('port', process.env.PORT || configServer.app.PORT);
  // adding security fixes
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(helmet.noCache({
    noEtag: true,
  })); // set Cache-Control header
  app.use(helmet.noSniff()); // set X-Content-Type-Options header
  app.use(helmet.frameguard()); // set X-Frame-Options header
  app.use(helmet.xssFilter()); // set X-XSS-Protection header
  app.enable('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

  app.use(session({
    name: 'SESS_ID',
    secret: configServer.app.SESSION_SECRET,
    resave: true,
    store,
    saveUninitialized: false,
  }));

  global.store = store;
  store.clear((err) => {
    if (err) {
      console.log(err);
    }
  });

  cron.schedule('*/30 * * * *', () => {
    store.clear((err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  app.use(bodyParser.urlencoded({
    extended: false,
  })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
  /**
   * enable CORS support. // Cross-Origin Request Support
   */
  // register all custom Middleware

  app.use(morgan('combined', {
    stream,
  }));
  app.use(ContentTypeMiddleware);
  app.use(EmptyContentMiddleware);
  app.use(CsrfMiddleware);
};

export default middleware;
