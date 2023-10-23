import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
import fs from 'fs';
import * as userController from './controllers/userController.js'
let server;

mongoose.connect(config.uriMongoDB).then(() => {
  console.log('Connected to database');
  server = app.listen(config.port, () => {
    console.log(userController.createUser());
    console.log(`Listening to port ${config.port}`);
  });
});
