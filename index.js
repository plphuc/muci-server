import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
let server;

mongoose.connect(config.uriMongoDB).then(() => {
  console.log('Connected to database');
  server = app.listen(config.port, async() => {
    console.log('Listening to port 8080');
  });
});

export const db = await mongoose.createConnection(config.uriMongoDB).asPromise();
