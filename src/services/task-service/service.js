/* eslint-disable no-param-reassign */
const uuid = require('uuid');

const model = require('./model');
const userService = require('../user-service/service');
const customErrors = require('../../custom-errors');

const add = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('add')) throw new customErrors.AccessDeniedError();

  // Make sure id exists and belongs to a user
  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  // Check limitation of user daily tasks count
  const tasks = await model.find(user.data.userId);
  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let result = numbers.reduce((a, b) => a + b, 0.0);
  result = parseFloat(result).toFixed(4);

  await model.create(id, user.data.userId, 'ADD');

  return result;
};

const subtract = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('subtract')) throw new customErrors.AccessDeniedError();

  // Make sure id exists and belongs to a user
  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  // Check limitation of user daily tasks count
  const tasks = await model.find(user.data.userId);
  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let result = numbers.reduce((a, b) => a - b);
  result = parseFloat(result).toFixed(4);

  await model.create(id, user.data.userId, 'SUBTRACT');

  return result;
};

const multiply = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('multiply')) throw new customErrors.AccessDeniedError();

  // Make sure id exists and belongs to a user
  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  // Check limitation of user daily tasks count
  const tasks = await model.find(user.data.userId);
  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let result = numbers.reduce((a, b) => a * b, 1.0);
  result = parseFloat(result).toFixed(4);

  await model.create(id, user.data.userId, 'MUTIPLY');

  return result;
};

const divide = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('divide')) throw new customErrors.AccessDeniedError();

  // Make sure id exists and belongs to a user
  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  // Check limitation of user daily tasks count
  const tasks = await model.find(user.data.userId);
  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let total = numbers[0];
  // eslint-disable-next-line no-restricted-syntax
  for (let i = 1; i < numbers.length; i += 1) {
    // eslint-disable-next-line security/detect-object-injection
    total /= numbers[i];
  }

  let result = total;
  result = parseFloat(result).toFixed(4);

  await model.create(id, user.data.userId, 'DIVIDE');

  return result;
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
