const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('../config/bcrypt');


const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    set: bcrypt.encrypt,
    select: false,
  },
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

/**
 * concat firstName with lastName
 */
schema.virtual('fullName').get(function () {
  return `${this.firstName}  ${this.lastName}`;
});


/**
 * @returns {Boolean}
 * validate a bcrypt password
 */
schema.methods.validatePassword = function (password, hash) {
  return bcrypt.compare(password, hash);
};

/**
 * @returns {Number}
 * generate a expirtation date for JWT
 */
const generateExpirationDate = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  return parseInt(expirationDate.getTime() / 1000, 10);
};

/**
 * @returns {String}
 * make a json web token
 */
schema.methods.generateJWT = function () {
  const expirationDate = generateExpirationDate();
  const { JWT_SECRET } = process.env;
  return jwt.sign({
    id: this._id,
    exp: expirationDate,
  }, JWT_SECRET);
};

/**
 * @returns {Object}
 * format user data
 */
schema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    fullName: this.fullName,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('users', schema);
