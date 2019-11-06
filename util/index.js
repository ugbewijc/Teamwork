const token = require('./token');
const db = require('./db');

// Export
module.exports = {
  generateUserToken: token.generateUserToken,
  generateAdminToken: token.generateAdminToken,
  verifyUserToken: token.verifyUserToken,
  verifyAdminToken: token.verifyAdminToken,
  runQuery: db.runQuery,
};
