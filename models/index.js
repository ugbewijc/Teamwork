const user = require('./users');
const gifs = require('./gifs');
const articles = require('./articles');
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
  saveArticle: articles.saveArticle,
  getArticle: articles.getArticle,
  updateArticle: articles.updateArticle,
  deleteArticle: articles.deleteArticle,
  saveArticleComment: articles.saveArticleComment,
  articleComment: articles.articleComment,
};
