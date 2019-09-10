const request = require('supertest');
const { OK, BAD_REQUEST } = require('http-status-codes');

const app = require('../app');
const connect = require('./config/db');

const { test, down } = require('../migrations');
const {
  fetchLoginUser,
  fetchErrorLoginUser,
  fetchAuthUser,
} = require('./mocks/users');

let loginUser = {};
let errorLoginUser = {};
let authUser = {};

beforeAll(async () => {
  await connect();
  await test();

  loginUser = await fetchLoginUser();
  errorLoginUser = await fetchErrorLoginUser();
  authUser = await fetchAuthUser();
});

afterAll(async () => {
  await down();
});

describe('Auth API', () => {
  it('Should log an user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send(loginUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(OK);
    const { body: { user } } = response;
    expect(user).toHaveProperty('_id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('fullName');
    expect(user).toHaveProperty('token');
    expect(user.email).toEqual(loginUser.user.email);
  });

  it('Should return a credentials error', async () => {
    const response = await request(app)
      .post('/api/login')
      .send(errorLoginUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST);
    const { body } = response;
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toBeInstanceOf(Array);
  });

  it('Should return a Bad Request error', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(BAD_REQUEST);
    const { body } = response;
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('errors');
    expect(body.errors).toBeInstanceOf(Array);
  });

  it('Should logout an user', async () => {
    const response = await request(app)
      .get('/api/logout')
      .set('Authorization', authUser.token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(OK);
    const { body } = response;
    expect(body).toEqual(true);
  });
});
