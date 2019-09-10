const { body } = require('express-validator');
const middleware = require('../middlewares/validator');

const login = () => {
  const params = [
    body('user.email')
      .isEmail()
      .trim(),

    body('user.password')
      .not().isEmpty(),
  ];

  return [params, middleware];
};

module.exports = {
  login,
};
