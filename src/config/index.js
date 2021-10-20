const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

['NODE_ENV', 'PORT', 'MONGO_URL', 'MONGO_USERNAME', 'MONGO_PASSWORD', 'MONGO_DB_NAME', 'JWT_KEY', 'LOG_FILE', 'LOG_LEVEL'].forEach((name) => {
  if (Object.keys(process.env).indexOf(name) < 0) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV.toLowerCase(),
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    file: path.join(__dirname, '..', (process.env.LOG_FILE || './service.log')),
  },
  documentation: {
    swagger: {
      info: {
        title: 'Task Management Service Swagger',
        description: 'Task Management Service Documentation',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  },
  server: {
    port: Number(process.env.PORT),
  },
  db: {
    url: process.env.MONGO_URL,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    name: process.env.MONGO_DB_NAME,
  },
  authorizationExpiry: process.env.AUTH_EXPIRY ? Number(process.env.AUTH_EXPIRY) : 30 * 24 * 60 * 60, // seconds
  tokenExpiry: process.env.TOKEN_EXPIRY ? Number(process.env.TOKEN_EXPIRY) : 24 * 60 * 60, // seconds
  keys: {
    jwtKey: process.env.JWT_KEY,
  },
};

module.exports = config;
