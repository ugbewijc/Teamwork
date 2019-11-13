const user = require('./user');
const gifs = require('./gifs');
const articles = require('./articles');

module.exports = {
  signInUser: user.signInUser,
  createUser: user.createUser,
  createGif: gifs.createGif,
  getGif: gifs.getGif,
  deleteGif: gifs.deleteGif,
  createComment: gifs.createComment,
  createArticle: articles.createArticle,
  getArticle: articles.getArticle,
  editArticle: articles.editArticle,
  deleteArticle: articles.deleteArticle,
  postComment: articles.postComment,
};
