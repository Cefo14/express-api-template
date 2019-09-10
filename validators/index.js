const { param, query } = require('express-validator');
const { ObjectId } = require('mongoose').Types;
const middleware = require('../middlewares/validator');

const FIRST_PAGE = 0;
const MIN_ITEMS = 5;
const MAX_ITEMS = 25;

const pagination = () => {
  const params = [
    query('page')
      .customSanitizer((value) => Number.parseInt(value, 10) || FIRST_PAGE)
      .customSanitizer((value) => Math.abs(value)),
    query('limit')
      .customSanitizer((value) => Number.parseInt(value, 10) || MIN_ITEMS)
      .customSanitizer((value) => Math.abs(value))
      .customSanitizer((value) => (value > MAX_ITEMS ? MAX_ITEMS : value)),
  ];
  return [params, middleware];
};

const validateMongoId = (paramName = 'id') => {
  const params = [
    param(paramName)
      .isString()
      .trim()
      .custom((id) => ObjectId.isValid(id)),
  ];

  return [params, middleware];
};

const search = (queryName = 'search') => {
  const params = [
    query(queryName)
      .isString()
      .escape()
      .trim(),
  ];

  return [params, middleware];
};

module.exports = {
  pagination,
  validateMongoId,
  search,
};
