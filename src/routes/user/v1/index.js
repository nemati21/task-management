const userCtrl = require('../../../services/user-service');
const { schemaTypes } = require('../../../lib');

const customTypes = {
  roleType: {
    type: 'string',
    enum: ['add', 'subtract', 'multiply', 'divide'],
  },
};

const swaggerTag = 'User Service';

const tokenHeader = {
  Authorization: { type: 'string', maxLength: 4096 },
};

module.exports = (fastify, options, next) => {
  fastify.post('/', {
    schema: {
      description: 'Create User',
      tags: [swaggerTag],
      body: {
        type: 'object',
        required: ['firstname', 'lastname', 'username', 'password', 'role', 'dailyTaskCount'],
        properties: {
          firstname: schemaTypes.string,
          lastname: schemaTypes.string,
          username: schemaTypes.string,
          password: schemaTypes.string,
          dailyTaskCount: schemaTypes.number,
          role: {
            type: 'array',
            items: customTypes.roleType,
          },
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            id: schemaTypes.uuid,
          },
        },
      },
    },
  }, userCtrl.create);

  fastify.delete('/:id', {
    schema: {
      description: 'Delete User',
      tags: [swaggerTag],
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: schemaTypes.uuid,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        ...schemaTypes.swagger204,
      },
    },
  }, userCtrl.remove);

  fastify.get('/users', {
    schema: {
      description: 'Inquiry Users',
      tags: [swaggerTag],
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: schemaTypes.uuid,
              firstname: schemaTypes.string,
              lastname: schemaTypes.string,
              username: schemaTypes.string,
              role: {
                type: 'array',
                items: customTypes.roleType,
              },
              createdts: schemaTypes.utcdatetime,
              updatedts: schemaTypes.utcdatetime,
            },
          },
        },
      },
      headers: tokenHeader,
    },
  }, userCtrl.query);

  next();
};
