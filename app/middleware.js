// Middleware for Application
import ContentTypeMiddleware from 'app/global/middlewares/ContentType';
import EmptyContentMiddleware from 'app/global/middlewares/EmptyContent';
import DelayResponseMiddleware from 'app/global/middlewares/DelayResponse';
import LocationMiddleware from 'app/global/middlewares/LocationMiddleware';
import CsrfMiddleware from 'app/global/middlewares/csrfMiddleware';

import passport from 'passport';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import configServer from './config/server';

const middleware = (app) => {
  app.use(passport.initialize());
  app.set('port', process.env.PORT || configServer.PORT);
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
  app.use(expressSession({
    name: 'SESS_ID',
    secret: configServer.SESSION_SECRET,
  }));
  app.use(bodyParser.urlencoded({
    extended: false,
  })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
  /**
   * enable CORS support. // Cross-Origin Request Support
   */
  // register all custom Middleware
  app.use(cors({
    optionsSuccessStatus: 200,
  }));
  app.use(ContentTypeMiddleware);
  app.use(EmptyContentMiddleware);
  app.use(LocationMiddleware);
  app.use(CsrfMiddleware);
};

export default middleware;
