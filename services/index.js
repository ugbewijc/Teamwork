const user = require('./users');
// const createUser = require('./user');

module.exports = {
  userValidation: user.userValidation,
  doUserEmailExsit: user.doUserEmailExsit,
  createNewUser: user.createNewUser,
};
