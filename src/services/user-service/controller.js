const service = require('./service');

const create = async (req, res) => {
  const { firstname, lastname, username, password, role, dailyTaskCount } = req.body;

  const result = await service.create(firstname, lastname, username.trim(), password, role, dailyTaskCount);

  res.code(200).send({ id: result });
};

const remove = async (req, res) => {
  const { id } = req.params;

  await service.remove(id);
  return res.code(204).send('');
};

const query = async (req, res) => {
  const users = await service.query();

  return res.send(users);
};

module.exports = {
  create,
  remove,
  query,
};
