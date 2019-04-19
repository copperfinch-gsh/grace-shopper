/* global describe beforeEach it */
const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';
    const firstName = 'Cody';
    const lastName = 'ThePug';
    const password = 'bonez';
    const isAdmin = true;

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        firstName: firstName,
        lastName: lastName,
        password: password,
        isAdmin: isAdmin
      });
    });

    it('GET /api/users will fail if user is not authenticated', async () => {
      // await request(app).post('/auth/login', {
      //   email: codysEmail,
      //   password: password
      // });
      const res = await request(app)
        .get('/api/users')
        .expect(401);

      expect(res.body).to.be.an('object');
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
