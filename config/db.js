const mongoose = require('mongoose');

const {
  NODE_ENV,
  DEVELOPMENT_MONGODB,
  PRODUCTION_MONGODB,
} = process.env;

const URL = NODE_ENV === 'development' ? DEVELOPMENT_MONGODB : PRODUCTION_MONGODB;

const config = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(URL, config);
mongoose.set('debug', false);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
// eslint-disable-next-line
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
