const { validationResult } = require('express-validator');
const { BAD_REQUEST } = require('http-status-codes');
const { InvalidParameterError } = require('../helpers/errors');

/**
 *
 * @param {Array} errors
 * @returns {Array}
 * transform 'express-validator' errors to 'errors'
 */
const formatErrors = (errors) => {
  const newErros = [...errors].map((error) => {
    const { param, value } = error;
    const lastPram = param.split('.').pop();
    const message = `${lastPram}: ${value}`;
    return new InvalidParameterError(message);
  });
  return newErros;
};

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatedErrors = formatErrors(errors.array());
    return res.status(BAD_REQUEST).json({ errors: formatedErrors });
  }
  return next();
};
