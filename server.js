import 'app-module-path/register';
import { addPath } from 'app-module-path';
import path from 'path';
import express from 'express';
import config from './config';
import MongoConnect from './app/mongoose';
import AppRoutes from './app/routes';
import { middleware } from './app/middleware';
import swagger from './app/swagger';
import sockets from './app/socket';

addPath(__dirname);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
// ---------------------------------------------//
// invoke routes, MIddleware, Mongo connect here
MongoConnect();
AppMiddleware(app);
AppRoutes(app);
swagger(app);
// ---------------------------------------------//
const server = app.listen(config.app.PORT);
console.log(`app running on ${config.app.PORT}`);
sockets(server);
MongoConnect();

// Clear all session on api restart
global.store.clear();


export default app;
