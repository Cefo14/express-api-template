const bcrypt = require('bcrypt');

const saltRounds = 8;

/**
 *
 * @param {String} text
 * @returns {String}
 *
 */
const encrypt = (text) => bcrypt.hashSync(text, saltRounds);

/**
 *
 * @param {String} text
 * @param {String} hash
 * @returns {Boolean}
 *
 */
const compare = (text, hash) => bcrypt.compareSync(text, hash);

module.exports = {
  encrypt,
  compare,
};
