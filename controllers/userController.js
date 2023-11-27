import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import { authServices, userServices } from "../services/index.js";
import httpStatus from "http-status";

const createUser = catchAsync(async function (req, res, next) {
  const user = await userServices.createUser(req.body)
  res.status(httpStatus.CREATED).send(user)
  console.log('CREATED')
})

const getUser = catchAsync(async function (req, res, next) {
  const refreshToken = await authServices.getUserByRefreshToken(req.query.refreshToken)
  const user = await userServices.getUserById(refreshToken.user)
  res.status(httpStatus.OK).send(user)
})  

export {
  createUser,
  getUser
}