const taskCtrl = require('../../../services/task-service');
const { schemaTypes } = require('../../../lib');

const swaggerTag = 'Task Service';

const tokenHeader = {
  Authorization: { type: 'string', maxLength: 4096 },
};

module.exports = (fastify, options, next) => {
  fastify.post('/add', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Sum numbers',
      tags: [swaggerTag],
      headers: tokenHeader,
      body: {
        type: 'object',
        required: ['numbers'],
        properties: {
          numbers: {
            type: 'array',
            minItems: 1,
            items: schemaTypes.number,
          },
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            result: schemaTypes.number,
          },
        },
      },
    },
  }, taskCtrl.add);

  fastify.post('/subtract', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Subtract numbers',
      tags: [swaggerTag],
      headers: tokenHeader,
      body: {
        type: 'object',
        required: ['numbers'],
        properties: {
          numbers: {
            type: 'array',
            minItems: 1,
            items: schemaTypes.number,
          },
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            result: schemaTypes.number,
          },
        },
      },
    },
  }, taskCtrl.subtract);

  fastify.post('/multiply', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Multiply numbers',
      tags: [swaggerTag],
      headers: tokenHeader,
      body: {
        type: 'object',
        required: ['numbers'],
        properties: {
          numbers: {
            type: 'array',
            minItems: 1,
            items: schemaTypes.number,
          },
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            result: schemaTypes.number,
          },
        },
      },
    },
  }, taskCtrl.multiply);

  fastify.post('/divide', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'divide numbers',
      tags: [swaggerTag],
      headers: tokenHeader,
      body: {
        type: 'object',
        required: ['numbers'],
        properties: {
          numbers: {
            type: 'array',
            minItems: 1,
            items: schemaTypes.number,
          },
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            result: schemaTypes.number,
          },
        },
      },
    },
  }, taskCtrl.divide);

  next();
};
