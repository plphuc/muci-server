import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
import fs from 'fs';
import User from './models/userModel.js';

let server;

mongoose.connect(config.uriMongoDB).then(() => {
  console.log('Connected to database');
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});
