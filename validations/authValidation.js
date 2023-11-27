import Joi from 'joi';
import { checkPassword } from './customValidation.js';

const getUser = {
  refreshToken: Joi.object().keys({
    token: Joi.string().required().invalid(''),
    expires: Joi.string().required().invalid(''),
  }),
};

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email().invalid(''),
    password: Joi.string().required().custom(checkPassword),
    name: Joi.string().required().invalid(''),
    username: Joi.string().required().invalid(''),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().invalid(''),
    password: Joi.string().required().custom(checkPassword),
  }),
};
export { register, login, getUser };
