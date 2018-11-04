import socket from 'socket.io';
import global from './global/middlewares/global';


const sockets = (server) => {
  const io = socket(server);
  io.on('connection', (Socket) => {
    global.Socket = Socket;
  });
};

// git clone https://github.com/remy/nodemon.git
export default sockets;
