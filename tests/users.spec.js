const request = require('supertest');
const { OK, CREATED } = require('http-status-codes');

const app = require('../app');
const connect = require('./config/db');

const { test, down } = require('../migrations');
const {
  userData,
  fetchAuthUser,
  fetchRandomUser,
} = require('./mocks/users');

let authUser = {};
let editedAuthUser = {};
let deletedAuthUser = {};
let newUser = {};
let token = '';

beforeAll(async () => {
  await connect();
  await test();

  authUser = await fetchAuthUser();
  token = `Token ${authUser.token}`;

  editedAuthUser = await fetchRandomUser();
  editedAuthUser.firstName = 'EDITED';

  deletedAuthUser = await fetchRandomUser();

  newUser = userData();
});

afterAll(async () => {
  await down();
});

describe('Users API', () => {
  it('Should return a paginated users', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(OK);
    const { body } = response;
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('items');
    expect(body.items).toBeInstanceOf(Array);
    expect(body).toHaveProperty('total');
    expect(body).toHaveProperty('currentPage');
    expect(body).toHaveProperty('pages');
  });

  it('Should return an user', async () => {
    const response = await request(app)
      .get(`/api/users/${authUser._id}`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(OK);
    const { body } = response;
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('firstName');
    expect(body).toHaveProperty('lastName');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
  });

  it('Should create and return an user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ user: newUser })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(CREATED);
    const { body } = response;
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('email');
    expect(body.email).toEqual(newUser.email);
  });

  it('Should edit and return an user', async () => {
    const response = await request(app)
      .put(`/api/users/${editedAuthUser._id}`)
      .set('Authorization', token)
      .send({ user: editedAuthUser })
      .expect('Content-Type', /json/)
      .expect(OK);
    const { body } = response;
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('_id');
    expect(body).toHaveProperty('firstName');
    expect(body.firstName).toEqual(editedAuthUser.firstName);
  });

  it('Should delete an user', async () => {
    const response = await request(app)
      .delete(`/api/users/${deletedAuthUser._id}`)
      .set('Authorization', token)
      .send({ user: deletedAuthUser })
      .expect('Content-Type', /json/)
      .expect(OK);
    const { body } = response;
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('_id');
  });
});
