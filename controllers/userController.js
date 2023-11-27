import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync.js';
import { authServices, userServices } from '../services/index.js';
import httpStatus from 'http-status';

const createUser = catchAsync(async function (req, res, next) {
  const user = await userServices.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async function (req, res, next) {
  const refreshTokenReq = JSON.parse(req.headers.authorization.split(' ')[1]);
  const userId = await authServices.getUserIdByRefreshToken(
    refreshTokenReq
  );
  const {password, ...resData} = await userServices.getUserById(userId);
  res.status(httpStatus.OK).send(resData);
});

export { createUser, getUser };
