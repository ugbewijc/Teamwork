const token = require('./token');
const db = require('./db');
const gifs = require('./gifs');

// Export
module.exports = {
  generateUserToken: token.generateUserToken,
  generateAdminToken: token.generateAdminToken,
  verifyUserToken: token.verifyUserToken,
  verifyAdminToken: token.verifyAdminToken,
  getEmailFromToken: token.getEmailFromToken,
  runQuery: db.runQuery,
  uploadGifs: gifs.uploadGifs,
  upload: gifs.upload,
};
