const jwt = require('jsonwebtoken');
const sha = require('sha256');
const uuid = require('uuid');

const model = require('./model');
const userService = require('../user-service/service');
const config = require('../../config');
const customError = require('../../custom-errors');

const generateToken = (user, expiry) => {
  const now = Math.floor(Date.now() / 1000);
  const expireTime = now + expiry;

  const token = jwt.sign({
    data: {
      userId: user.id,
      role: user.role,
    },
  }, config.keys.jwtKey, { expiresIn: expireTime });

  return {
    token,
    expiresIn: new Date(expireTime * 1000 - (new Date()).getTimezoneOffset() * 60 * 1000).toISOString(),
  };
};

const implicitAuthenticate = async (username, password) => {
  let token = null;

  // username and password check
  const user = await userService.find(null, username);
  if (!user) throw new customError.UserNotFoundError();

  if (user.password !== sha(password)) throw new customError.AccessDeniedError();

  // If token exists
  token = await model.findToken(user.id);
  if (token) await model.revokeToken(user.id);

  const id = uuid.v4();
  token = generateToken(user, config.tokenExpiry);
  await model.storeToken(id, user.id, token, config.tokenExpiry);

  return { id, ...token };
};

const logout = async (userId) => {
  let token = null;

  // username and password check
  const user = await userService.find(userId, null);
  if (!user) throw new customError.UserNotFoundError();

  // If token exists
  token = await model.findToken(userId);
  if (token) await model.revokeToken(userId);

  return true;
};

module.exports = {
  implicitAuthenticate,
  logout,
};
