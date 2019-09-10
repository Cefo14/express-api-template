const { body } = require('express-validator');
const middleware = require('../middlewares/validator');
const { pagination, validateMongoId } = require('./index');

const index = pagination;

const show = validateMongoId;

const store = () => {
  const params = [
    body('user.firstName')
      .isString()
      .not().isEmpty()
      .escape()
      .trim(),

    body('user.lastName')
      .isString()
      .not().isEmpty()
      .escape()
      .trim(),

    body('user.email')
      .isEmail()
      .trim(),

    body('user.password')
      .not().isEmpty(),
  ];

  return [params, middleware];
};

const update = () => {
  const params = [
    body('user.firstName')
      .optional()
      .isString()
      .escape()
      .trim(),

    body('user.lastName')
      .optional()
      .isString()
      .escape()
      .trim(),

    body('user.email')
      .optional()
      .isEmail()
      .trim(),

    body('user.password')
      .optional(),
  ];

  return [...validateMongoId(), params, middleware];
};

const destroy = validateMongoId;

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
