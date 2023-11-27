import httpStatus from 'http-status';
import { userServices } from './index.js';
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

const getUserByRefreshToken = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken });
  if (!refreshTokenDoc || refreshTokenDoc.expire > moment()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
  return refreshTokenDoc
}

export { loginWithEmailAndPassword, getUserByRefreshToken };
