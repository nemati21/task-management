const uuid = require('uuid');
const sha = require('sha256');
const model = require('./model');
const customErrors = require('../../custom-errors');

const find = async (id, username) => {
  const user = await model.find(id, username);
  return user;
};

const create = async (firstname, lastname, username, password, role, dailyTaskCount) => {
  const id = uuid.v4();

  const existedUser = await find(null, username);
  if (existedUser) throw new customErrors.UserAlreadyExistError();

  await model.create(id, firstname, lastname, username, sha(password), role, dailyTaskCount);
  return id;
};

const remove = async (id) => {
  const user = await find(id);
  if (!user) throw new customErrors.UserNotFoundError();

  const result = await model.remove(user);
  return result;
};

const query = async () => {
  const users = await model.query();
  return users || [];
};

module.exports = {
  create,
  remove,
  find,
  query,
};
