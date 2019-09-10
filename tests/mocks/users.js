const faker = require('faker');
const Users = require('../../models/users');

const userData = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email().toLocaleLowerCase(),
  password: '12345',
});

const fetchRandomUser = async () => {
  const count = Users.count();
  const random = Math.floor(Math.random() * count);
  const user = Users.findOne().skip(random);
  return user;
};

const fetchLoginUser = async () => {
  const user = await fetchRandomUser();
  const foundUser = {
    email: user.email,
    password: '12345',
  };
  return { user: foundUser };
};

const fetchErrorLoginUser = async () => {
  const user = await fetchRandomUser();
  const foundUser = {
    email: user.email,
    password: '',
  };
  return { user: foundUser };
};

const fetchAuthUser = async () => {
  const user = await fetchRandomUser();
  const foundUser = user.toAuthJSON();
  return foundUser;
};

module.exports = {
  userData,
  fetchRandomUser,
  fetchLoginUser,
  fetchErrorLoginUser,
  fetchAuthUser,
};
