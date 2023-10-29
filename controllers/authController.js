import catchAsync from "../utils/catchAsync.js";
import { userServices } from "../services/index.js";
import httpStatus from "http-status";

const register = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body)
  res.status(httpStatus.CREATED).send(user);
})

export {
  register
}