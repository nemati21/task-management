const InternalError = require('./InternalError');
const RejectError = require('./RejectError');
const RequestError = require('./RequestError');
const UserNotFoundError = require('./UserNotFoundError');
const UserAlreadyExistError = require('./UserAlreadyExistError');
const PasswordIncorrectError = require('./PasswordIncorrectError');

module.exports = {
  RejectError,
  InternalError,
  RequestError,
  UserNotFoundError,
  UserAlreadyExistError,
  PasswordIncorrectError,
};
