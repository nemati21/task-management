/* eslint-disable no-template-curly-in-string */
/* eslint-disable security/detect-non-literal-regexp */
const request = require('supertest');
const itParam = require('mocha-param');
const expect = require('expect');

const utils = require('./utils');
const config = require('../src/config');

const address = `http://0.0.0.0:${config.server.port}`;

let user = null;
let userId = null;
let token = null;
let task = null;

describe('Users', () => {
  describe('POST: /user', () => {
    describe('Check the mandatory parameters of user', () => {
      user = {
        firstname: 'Behnaz',
        lastname: 'Nemati',
        username: 'admin',
        password: 'Admin@123',
        role: ['add', 'subtract', 'multiply', 'divide'],
        dailyTaskCount: 5,
      };

      itParam('should check that ${value.label} is required', utils.prepare(user, 'user'), (done, value) => {
        request(address)
          .post('/api/v1/user')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(value.data))
          .expect(400)
          .expect((res) => {
            expect(res.body.code).toBe(1099);
          })
          .end(done);
      });
    });

    describe('Create a new user', () => {
      it('should create a new user', (done) => {
        user = {
          firstname: 'Behnaz',
          lastname: 'Nemati',
          username: 'admin',
          password: 'Admin@123',
          role: ['add', 'subtract', 'multiply', 'divide'],
          dailyTaskCount: 4,
        };

        request(address)
          .post('/api/v1/user')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(user))
          .expect(200)
          .expect((res) => {
            userId = res.body.id;
            expect(res.body).toBeAn('object');
            expect(res.body.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/);
          })
          .end(done);
      });
    });

    describe('Check user validation', () => {
      it('Check the user is unique', (done) => {
        user = {
          firstname: 'Behnaz',
          lastname: 'Nemati',
          username: 'admin',
          password: 'Admin@123',
          role: ['add', 'subtract', 'multiply', 'divide'],
          dailyTaskCount: 5,
        };

        request(address)
          .post('/api/v1/user')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(user))
          .expect(400)
          .expect((res) => {
            expect(res.body.code).toEqual(1007);
          })
          .end(done);
      });
    });
  });
});

describe('Authentication', () => {
  describe('POST: /login', () => {
    describe('Check the mandatory parameters of login', () => {
      it('should check that username is required', (done) => {
        request(address)
          .post('/api/v1/login')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({ password: 'admin@123' }))
          .expect(400)
          .expect((res) => {
            expect(res.body.code).toBe(1099);
          })
          .end(done);
      });

      it('should check that password is required', (done) => {
        request(address)
          .post('/api/v1/login')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({ username: 'admin' }))
          .expect(400)
          .expect((res) => {
            expect(res.body.code).toBe(1099);
          })
          .end(done);
      });
    });

    describe('Login', () => {
      it('should login with username and password', (done) => {
        request(address)
          .post('/api/v1/login')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({ username: 'admin', password: 'Admin@123' }))
          .expect(200)
          .expect((res) => {
            token = res.body.token;
            expect(res.body).toBeAn('object');
          })
          .end(done);
      });
    });
  });

  describe('POST: /logout', () => {
    describe('Logout', () => {
      it('should logout', (done) => {
        request(address)
          .post('/api/v1/logout')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify({}))
          .expect(204)
          .end(done);
      });
    });
  });
});

describe('Tasks', () => {
  describe('POST: /tasks', () => {
    describe('Check the mandatory parameters of tasks', () => {
      it('should check that numbers is required', (done) => {
        request(address)
          .post('/api/v1/tasks/add')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify({ numbers: [] }))
          .expect(400)
          .expect((res) => {
            expect(res.body.code).toBe(1099);
          })
          .end(done);
      });
    });

    describe('Sum numbers', () => {
      it('should sum numbers of an array', (done) => {
        task = { numbers: [2, 3.2, 0.4, 5] };

        request(address)
          .post('/api/v1/tasks/add')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify(task))
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeAn('object');
            expect(res.body.result).toEqual(10.6);
          })
          .end(done);
      });
    });

    describe('Subtract numbers', () => {
      it('should subtract numbers of an array', (done) => {
        task = { numbers: [2, 3.2, 0.4, 5] };

        request(address)
          .post('/api/v1/tasks/subtract')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify(task))
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeAn('object');
            expect(res.body.result).toEqual(-6.6);
          })
          .end(done);
      });
    });

    describe('Multiply numbers', () => {
      it('should multiply numbers of an array', (done) => {
        task = { numbers: [2, 3.2, 0.4, 5] };

        request(address)
          .post('/api/v1/tasks/multiply')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify(task))
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeAn('object');
            expect(res.body.result).toEqual(12.8);
          })
          .end(done);
      });
    });

    describe('Divide numbers', () => {
      it('should division numbers of an array', (done) => {
        task = { numbers: [2, 3.2, 0.4, 5] };

        request(address)
          .post('/api/v1/tasks/divide')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify(task))
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeAn('object');
            expect(res.body.result).toEqual(0.3125);
          })
          .end(done);
      });
    });

    describe('Sum numbers', () => {
      it('should sum numbers of an array', (done) => {
        task = { numbers: [2, 3.2, 0.4, 5] };

        request(address)
          .post('/api/v1/tasks/add')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify(task))
          .expect(400)
          .expect((res) => {
            expect(res.body.code).toBe(1008);
          })
          .end(done);
      });
    });
  });
});

describe('Authentication', () => {
  describe('POST: /logout', () => {
    describe('Logout', () => {
      it('should logout', (done) => {
        request(address)
          .post('/api/v1/logout')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send(JSON.stringify({}))
          .expect(204)
          .end(done);
      });
    });
  });
});

describe('Users', () => {
  describe('DELETE: /user/:id', () => {
    it('should check the id exists and belongs to user', (done) => {
      request(address)
        .delete(`/api/v1/user/${process.env.CUSTOM_ID}`)
        .set('Content-Type', 'application/json')
        .expect(400)
        .expect((res) => {
          expect(res.body.code).toEqual(1006);
        })
        .end(done);
    });

    it('should remove a user', (done) => {
      request(address)
        .delete(`/api/v1/user/${userId}`)
        .set('Content-Type', 'application/json')
        .expect(204)
        .end(done);
    });
  });
});

