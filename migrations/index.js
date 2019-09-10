/**
 * This module is proposed to generate default data,
 * as well as junk data to raise it to the user level
 */

const { MODE, NODE_ENV } = process.env;

if (NODE_ENV !== 'test') {
  const path = require('path');
  const envPath = path.join(__dirname, '..', '.env');
  require('node-env-file')(envPath);
  require('./db');
}

const Users = require('./users');

const up = async () => {
  await Users.up();
};

const down = async () => {
  await Promise.all([
    Users.down(),
    // ...
  ]);
};

const spam = async () => {
  await Users.spam();
};

const reset = async () => {
  await down();
  await up();
};

const test = async () => {
  await down();
  await spam();
};

const run = async () => {
  try {
    if (MODE === 'UP') await up();
    else if (MODE === 'DOWN') await down();
    else if (MODE === 'SPAM') await spam();
    else if (MODE === 'RESET') await reset();
    else if (MODE === 'TEST') await test();
  }
  catch (err) {
    // eslint-disable-next-line
    console.error(err);
  }
  finally {
    process.exit(0);
  }
};

if (NODE_ENV !== 'test') run();

module.exports = {
  up,
  down,
  spam,
  reset,
  test,
};
