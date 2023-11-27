import catchAsync from '../utils/catchAsync.js';
import { authServices, tokenServices, userServices } from '../services/index.js';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const user = await userServices.createUser(req.body);
  const tokens = await tokenServices.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.loginWithEmailAndPassword(email, password);
  const tokens = await tokenServices.generateAuthTokens(user);
  res.send({user, tokens})
});

export { register, login };
