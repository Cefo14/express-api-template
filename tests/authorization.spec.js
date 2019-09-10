const request = require('supertest');
const { UNAUTHORIZED } = require('http-status-codes');

const app = require('../app');


describe('Permissions', () => {
  describe('Users API:', () => {
    it('Should return an unauthorized error', async () => {
      await request(app)
        .get('/api/users')
        .expect(UNAUTHORIZED);
      await request(app)
        .post('/api/users')
        .expect(UNAUTHORIZED);
      await request(app)
        .put('/api/users')
        .expect(UNAUTHORIZED);
      await request(app)
        .post('/api/users/search')
        .expect(UNAUTHORIZED);
    });
  });
});
