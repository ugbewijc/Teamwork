const token = require('./token');
const gifs = require('./gifs');

// Export
module.exports = {
  generateUserToken: token.generateUserToken,
  generateAdminToken: token.generateAdminToken,
  verifyUserToken: token.verifyUserToken,
  verifyAdminToken: token.verifyAdminToken,
  getEmailFromToken: token.getEmailFromToken,
  uploadGifs: gifs.uploadGifs,
  upload: gifs.upload,
};
