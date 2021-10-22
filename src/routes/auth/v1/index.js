const authCtrl = require('../../../services/auth-service');
const { schemaTypes } = require('../../../lib');

const swaggerTag = 'Authentication Service';

module.exports = (fastify, options, next) => {
  fastify.post('/login', {
    schema: {
      description: 'Login',
      tags: [swaggerTag],
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: schemaTypes.string,
          password: schemaTypes.string,
        },
      },
      ...schemaTypes.swaggerErrorTypes,
      200: {
        type: 'object',
        properties: {
          token: schemaTypes.string,
          type: schemaTypes.string,
          expiresIn: schemaTypes.utcdatetime,
        },
      },
    },
  }, authCtrl.authenticate);

  fastify.post('/logout', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Logout',
      tags: [swaggerTag],
      headers: {
        Authorization: { type: 'string', maxLength: 4096 },
      },
    },
    ...schemaTypes.swaggerErrorTypes,
    ...schemaTypes.swagger204,
  }, authCtrl.logout);

  next();
};
