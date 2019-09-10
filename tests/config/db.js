const MongodbMemoryServer = require('mongodb-memory-server').default;
const mongoose = require('mongoose');

// eslint-disable-next-line
jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;

// Start MongoDB instance
const mongod = new MongodbMemoryServer();

const connect = async () => {
  const uri = await mongod.getConnectionString();
  const connection = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.set('debug', false);
  return connection;
};

module.exports = connect;
