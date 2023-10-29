import User from '../models/userModel.js';
import ApiError from '../utils/apiError.js';
import httpStatus from 'http-status';

const createUser = async (userData) => {
  if (await User.isEmailTaken(userData.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }
  return User.create(userData);
};

export { createUser };
