const user = require('./users');
// const createUser = require('./user');

module.exports = {
  getUserByMailAndPwd: user.getUserByMailAndPwd,
  getUserByEmail: user.getUserByEmail,
  saveUser: user.saveUser,
};
