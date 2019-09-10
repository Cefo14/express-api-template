const passport = require('passport');
const blacklist = require('express-jwt-blacklist');
const { OK, BAD_REQUEST } = require('http-status-codes');

// POST
const login = async (req, res, next) => (
  passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const newUser = passportUser;
      newUser.token = passportUser.generateJWT();
      return res.json({ user: newUser.toAuthJSON() });
    }

    return res.status(BAD_REQUEST).json(info);
  })(req, res, next)
);

// GET
const logout = (req, res, next) => {
  try {
    blacklist.revoke(req.payload);
    res.status(OK).json(true);
  }

  catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  logout,
};
