import Joi from 'joi';
import { password } from './customValidation.js';

const getUser = {
  refreshToken: Joi.string().required().invalid(''),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().invalid(''),
    password: Joi.string().required().custom(password),
    name: Joi.string().required().invalid(''),
    username: Joi.string().required().invalid(''),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().invalid(''),
    password: Joi.string().required().custom(password),
  }),
};
export { register, login, getUser };
