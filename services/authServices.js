import httpStatus from 'http-status';
import { tokenServices, userServices } from './index.js';
import ApiError from '../utils/apiError.js';
import Token from '../models/tokenModel.js';
import moment from 'moment';

const loginWithEmailAndPassword = async (email, password) => {
  const user = await userServices.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

const getUserIdByRefreshToken = async (refreshToken) => {
  const userId = await tokenServices.verifyToken(refreshToken);
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
  return userId;
};

export { loginWithEmailAndPassword, getUserIdByRefreshToken };
