const service = require('./service');

const add = async (req, res) => {
  const { numbers } = req.body;

  const result = await service.add(numbers, req.user);

  res.code(200).send({ result });
};

const subtract = async (req, res) => {
  const { numbers } = req.body;

  const result = await service.subtract(numbers, req.user);

  res.code(200).send({ result });
};

const multiply = async (req, res) => {
  const { numbers } = req.body;

  const result = await service.multiply(numbers, req.user);

  res.code(200).send({ result });
};

const divide = async (req, res) => {
  const { numbers } = req.body;

  const result = await service.divide(numbers, req.user);

  res.code(200).send({ result });
};

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
