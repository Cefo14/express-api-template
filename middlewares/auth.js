const jwt = require('express-jwt');

/**
 *
 * @param {Object} req
 * @returns {String|null}
 *
 */
const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  const [label, token] = (authorization || '').split(' ');
  if (label === 'Token' && token) return token;
  return null;
};

const { JWT_SECRET } = process.env;
const auth = {
  required: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
