const user = require('./users');
const gifs = require('./gifs');
// const createUser = require('./user');

module.exports = {
  getUserByMailAndPwd: user.getUserByMailAndPwd,
  getUserByEmail: user.getUserByEmail,
  saveUser: user.saveUser,
  saveGifToDB: gifs.saveGifToDB,
  getSingleGif: gifs.getSingleGif,
  deleteGif: gifs.deleteGif,
  saveGifComment: gifs.saveGifComment,
  gifComment: gifs.gifComment,
};
