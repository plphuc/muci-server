import catchAsync from '../utils/catchAsync.js';
import { tokenServices, userServices } from '../services/index.js';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);
  const tokens = tokenServices.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  console.log(req);
});
export { register, login };
