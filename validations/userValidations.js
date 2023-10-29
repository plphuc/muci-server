import Joi from 'joi';
import { password } from './customValidation.js';

const createUserSchema = Joi.object().keys({
  email: Joi.string().required().email().invalid(''),
  password: Joi.string().required().custom(password),
  name: Joi.string().required().invalid(''),
  username: Joi.string().required().invalid(''),
});

export { createUserSchema };

