/* eslint-disable global-require */
const app = require('../src/server');
const { client } = require('../src/database');
const { setConsoleMessage } = require('../src/lib');

describe('Unit Tests', () => {
  before(() => {
    client.connect()
      .then(() => {
        console.log(setConsoleMessage('Connection to service', 'OK'));
        app.start();
      })
      .catch((err) => {
        console.log(setConsoleMessage(`Connection to service. ERROR: ${err}`, 'ERROR'));
        client.close();
        process.exit(1);
      });
  });

  require('./all.test');

  after(() => {
    process.exit(0);
  });
});
