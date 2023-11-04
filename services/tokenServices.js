import moment from 'moment';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import tokenTypes from '../config/token.js';
import Token from '../models/tokenModel.js';
import User from '../models/userModel.js';
import ApiError from '../utils/apiError.js';
import httpStatus from 'http-status';

const generateToken = (userId, expireTime, secret = config.secret, type) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expireTime.unix(),
    type,
  };

  return jwt.sign(payload, secret);
};

const verifyAccessToken = async (token) => {
  const payload = jwt.verify(token, config.secret)
  const currentTime = moment().unix()
  if ((currentTime >= payload.exp) && (payload.type === 'access')) {
    const user = await User.findById(payload.sub)
    console.log(user);
    return user
  }
   throw new ApiError(httpStatus.UNAUTHORIZED, 'access token is not valid')
}

// not save access token
const saveToken = async (refreshToken, userId, expireTime, type) => {
  const tokenDoc = await Token.create({
    token: refreshToken,
    user: userId,
    type,
    expire: expireTime,
  });
  return tokenDoc;
};

const generateAuthTokens = (user) => {
  // help set expire time, return will calculate from current and expire time
  const accessTokenExpireTime = moment().add(config.expireTime, 'minutes');
  const accessToken = generateToken(
    user.id,
    accessTokenExpireTime,
    tokenTypes.ACCESS
  );

  const refreshTokenExpireTime = moment().add(config.refreshTime, 'days');
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpireTime,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpireTime,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpireTime,
    },
  };
};

export { generateToken, generateAuthTokens, saveToken, verifyAccessToken };
