const user = require('./users');
const gifs = require('./gifs');
// const createUser = require('./user');

module.exports = {
  userValidation: user.userValidation,
  doUserEmailExsit: user.doUserEmailExsit,
  createNewUser: user.createNewUser,
  getUserByEmail: user.getUserByEmail,
  uploadGifs: gifs.uploadGifs,
  saveGif: gifs.saveGif,
  getGif: gifs.getGif,
  deleteGif: gifs.deleteGif,
  removeGif: gifs.removeGif,
  saveComment: gifs.saveComment,
  getGifComment: gifs.getGifComment,
};
