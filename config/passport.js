const passport = require('passport');
const LocalStrategy = require('passport-local');
const { CustomError } = require('../helpers/errors');

const Users = require('../models/users');

const fields = {
  usernameField: 'user[email]',
  passwordField: 'user[password]',
};

const strategy = (email, password, done) => {
  Users.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user || !user.validatePassword(password, user.password)) {
        const invalidCredentialsError = new CustomError('UNAUTHORIZED', 'email or password is invalid');
        return done(null, false, { errors: [invalidCredentialsError] });
      }

      return done(null, user);
    }).catch(done);
};

passport.use(new LocalStrategy(fields, strategy));
