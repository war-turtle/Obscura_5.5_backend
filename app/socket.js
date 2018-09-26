import socket from 'socket.io';

const fs = require('fs');
// const jsonData = require('../session.json');


const check = (obj, username) => {
  let flag = false;
  Object.keys(obj).forEach((k) => {
    if (obj[k] === username) {
      flag = true;
    }
  });
  return flag;
};

const sockets = (server) => {
  const io = socket(server);
  console.log('clearing json');
  let data = JSON.stringify({});
  fs.writeFileSync('session.json', data);
  io.on('connection', (Socket) => {
    const jsonData = require('../session.json');

    Socket.on('disconnect', () => {
      delete jsonData[Socket.id];
      data = JSON.stringify(jsonData);
      fs.writeFileSync('session.json', data);
    });

    Socket.on('checkUser', (user) => {
      console.log(jsonData);
      if (check(jsonData, user.username)) {
        if (jsonData[Socket.id] !== user.username) {
          Socket.emit('stopUser', null);
          console.log('stop');
        }
      } else {
        jsonData[Socket.id] = user.username;
        const data = JSON.stringify(jsonData);
        fs.writeFileSync('session.json', data);
      }
    });
  });
};

// git clone https://github.com/remy/nodemon.git
export default sockets;
