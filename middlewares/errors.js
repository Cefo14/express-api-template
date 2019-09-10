const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { CustomError } = require('../helpers/errors');

/**
 *
 * @param {String} type
 * @param {String} message
 * @param {Number} status
 * @returns {Object}
 * get an error status code and message
 */
const getResponse = (type = '', message = '', status = INTERNAL_SERVER_ERROR) => ({
  status,
  error: new CustomError(type, message),
});

/**
 *
 * @param {String} type
 * @param {String} message
 * evalue mongoose errors
 */
const mongooseError = (type, message) => {
  if (type === 'CastError') {
    return getResponse(type, message, BAD_REQUEST);
  }
  return getResponse(type, message);
};

/**
 *
 * @param {Object} err
 */
const evalueError = (err) => {
  const instance = err.constructor.name;
  const type = err.name;
  const { message } = err;

  if (instance === 'MongooseError') {
    return mongooseError(type, message);
  }

  if (instance === 'UnauthorizedError') {
    return getResponse(type, message, UNAUTHORIZED);
  }

  return getResponse(type, type);
};

/**
 *
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * response an error
 */
const globalErrors = (err, req, res) => {
  const { status, error } = evalueError(err);
  return res.status(status).json({ errors: [error] });
};

module.exports = globalErrors;
