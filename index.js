import mongoose from 'mongoose';
import app from './app.js';
import config from './config/config.js';
import Joi from 'joi';
import { createUserSchema } from './validations/userValidations.js';

let server;

const sampleUser = {username: 'plphuc',
  name: 'Pham Phuc',
  email: 'plphuc@gmail.com',
  password: 'Plphuc0512=/',
  role: 'admin'
}

mongoose.connect(config.uriMongoDB).then(() => {
  console.log('Connected to databse');
  server = app.listen(config.port, () => {
    console.log('Listening to port 8080');
  });
});
