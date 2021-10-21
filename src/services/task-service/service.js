/* eslint-disable no-param-reassign */
const uuid = require('uuid');

const model = require('./model');
const userService = require('../user-service/service');
const customErrors = require('../../custom-errors');

const add = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('add')) throw new customErrors.AccessDeniedError();

  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  await model.create(id, user.data.userId, 'ADD');
  const tasks = await model.find(user.data.userId);

  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let result = numbers.reduce((a, b) => a + b, 0.0);
  result = parseFloat(result).toFixed(4);

  return result;
};

const subtract = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('subtract')) throw new customErrors.AccessDeniedError();

  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  await model.create(id, user.data.userId, 'SUBTRACT');
  const tasks = await model.find(user.data.userId);

  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let result = numbers.reduce((a, b) => a - b, 0.0);
  result = parseFloat(result).toFixed(4);

  return result;
};

const multiply = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('multiply')) throw new customErrors.AccessDeniedError();

  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  await model.create(id, user.data.userId, 'MUTIPLY');
  const tasks = await model.find(user.data.userId);

  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let result = numbers.reduce((a, b) => a * b, 1.0);
  result = parseFloat(result).toFixed(4);


  return result;
};

const divide = async (numbers, user) => {
  const id = uuid.v4();

  if (!user.data.role.includes('divide')) throw new customErrors.AccessDeniedError();

  const existedUser = await userService.find(user.data.userId);
  if (!existedUser) throw new customErrors.UserNotFoundError();

  await model.create(id, user.data.userId, 'DIVIDE');
  const tasks = await model.find(user.data.userId);

  if (tasks.count >= existedUser.dailyTaskCount) throw new customErrors.ExceedTaskCountError();

  let total = numbers[0];
  // eslint-disable-next-line no-restricted-syntax
  for (const num of numbers) {
    if (num !== 0) {
      total /= num;
    }
  }

  let result = total;
  result = parseFloat(result).toFixed(4);

  return result;
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
