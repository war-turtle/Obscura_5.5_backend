import socket from 'socket.io';
import Chat from './models/chats';
import global from './global/middlewares/global';

const sockets = (server) => {
  const io = socket(server);
  let usr;

  io.on('connection', (socket) => {
    // console.log('connected');
    global.socket = socket;
    socket.on('joinRoom', (user) => {
      usr = user;
      // console.log(user.user.team_id);
      socket.join(user.user.team_id);

      socket.join(user.user.username);
      // console.log(io.sockets.adapter.rooms);

      Chat.findById(usr.user.team_id).then((msg) => {
        // console.log(msg.messages);
        socket.emit('roomJoin', {
          success: true,
          messages: msg.messages,
        });
      }).catch((err) => {
        socket.emit('roomJoin', {
          success: false,
        });
      });
    });

    socket.on('sendMessage', (message) => {
      Chat.findByIdAndUpdate(usr.user.team_id,
        {
          $push: {
            messages: {
              message: message.message,
              sender: usr.user.username,
            },
          },
        },
        { upsert: true },
        (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            io.to(message.team_id).emit('messageRecieved', {
              message: message.message,
              sender: message.sender,
            });
          }
        });
    });
  });
};

// git clone https://github.com/remy/nodemon.git
export default sockets;
