const faker = require('faker');

const Users = require('../models/users');
const { arrayAutoFillGenerator } = require('../helpers');

const spam = async () => {
  const users = arrayAutoFillGenerator(100, () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLocaleLowerCase(),
    password: '12345',
  }));

  const data = await Users.insertMany(users);

  return data;
};

const up = async () => {
  const data = await Users.insertMany([
    {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      password: '12345',
    },
  ]);
  return data;
};

const down = async () => {
  await Users.deleteMany();
};

module.exports = {
  up,
  down,
  spam,
};
