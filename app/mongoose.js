import mongoose from 'mongoose';
import configDatabase from '../config';

mongoose.Promise = global.Promise;

const MongoConnect = () => {
  const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true,
  };

  const db = mongoose.connect(configDatabase.db.url, options, (error) => {
    if (error) {
      console.log(`Mongoose default connection error: ${error}`);
    } else {
      console.log('mongo Connected :)');
    }
  });
  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose default connection error: ${err}`);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });


  return db;
};

export default MongoConnect;
