import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync.js";
import * as userServices from '../services/userServices.js'

const sampleUser = {
  username: 'plphuc',
  name: 'Pham Phuc',
  email: 'plphuc@gmail.com',
  password: 'plp'
}

const createUser = catchAsync(async function (req, res, next) {
  const user = await userServices.createUser(sampleUser)
  console.log("user: ", user);
})

export {
  createUser
}