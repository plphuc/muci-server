import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import { userServices } from "../services/index.js";
import httpStatus from "http-status";

const createUser = catchAsync(async function (req, res, next) {
  const user = await userServices.createUser(req.body)
  res.status(httpStatus.CREATED).send(user)
})

export {
  createUser
}