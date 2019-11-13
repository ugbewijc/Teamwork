const user = require('./users');
const gifs = require('./gifs');
const articles = require('./articles');

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
  newArticle: articles.newArticle,
  getArticle: articles.getArticle,
  updateArticle: articles.updateArticle,
  delArticle: articles.delArticle,
  saveArticleComment: articles.saveArticleComment,
  getArticleComment: articles.getArticleComment,
};
