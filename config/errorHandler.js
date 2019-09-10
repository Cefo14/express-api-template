const errorhandler = require('errorhandler');
const { prettyConsole } = require('../helpers');

const formatError = (err, str, req) => {
  const type = err.constructor.name;
  const { method, url } = req;
  const { name, message } = err;

  const error = {
    type,
    method,
    url,
    name,
    description: message,
  };

  prettyConsole({ error }, 'error');
};

const config = {
  log: formatError,
};

module.exports = errorhandler(config);
