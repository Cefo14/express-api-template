/* eslint-disable max-classes-per-file */
class CustomError extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}

class InvalidParameterError extends Error {
  constructor(name) {
    super();
    this.code = 'INVALID_PARAMETER';
    this.message = `Parameter "${name}" is invalid`;
  }
}

module.exports = {
  CustomError,
  InvalidParameterError,
};
