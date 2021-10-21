const service = require('./service');
const customError = require('../../custom-errors');

const authenticate = async (req, res) => {
  const { username, password } = req.body;

  const result = await service.implicitAuthenticate(username, password);
  if (!result) throw new customError.AccessDeniedError();

  result.type = 'Bearer';

  return res.code(200).send({ token: result.token, type: result.type, expiresIn: result.expiresIn });
};

const logout = async (req, res) => {
  const { user } = req;

  await service.logout(user.data.userId);

  return res.code(204).send('');
};

module.exports = {
  authenticate,
  logout,
};
