import catchAsync from '../utils/catchAsync.js';
import { tokenServices, userServices } from '../services/index.js';
import httpStatus from 'http-status';
import getTokenFromHeader from '../utils/getTokenFromHeader.js';
import tokenTypes from '../config/token.js';

const createUser = catchAsync(async function (req, res, next) {
  const user = await userServices.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async function (req, res, next) {
  const tokenReq = getTokenFromHeader(req);
  const userId = tokenServices.verifyToken(tokenReq);
  const { password, _id, ...resData } = await userServices.getUserById(userId);
  const accessToken = tokenServices.generateToken(userId, tokenTypes.ACCESS);
  res.status(httpStatus.OK).send({ ...resData, id: userId, accessToken });
});

const assignUserId = (req, res, next) => {
  const userId = tokenServices.getUserIdByToken(req);
  Object.assign(req, { userId });
};

export { createUser, getUser, assignUserId };
