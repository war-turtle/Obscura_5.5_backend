import express from 'express';
import path from 'path';
import config from './config';
import MongoConnect from './app/mongoose';
import AppRoutes from './app/routes';
import middleware from './app/middleware';
// import swagger from './app/swagger';
import sockets from './app/socket';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
// ---------------------------------------------//
// invoke routes, MIddleware, Mongo connect here
middleware(app);
AppRoutes(app);
// swagger(app);
// ---------------------------------------------//
const server = app.listen(config.app.PORT);
console.log(`app running on ${config.app.PORT}`);
sockets(server);
MongoConnect();

export default server;
