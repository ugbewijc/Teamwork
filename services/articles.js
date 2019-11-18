const validator = require('validator');
const models = require('../models');

const newArticle = (userId, title, article) => {
  if (!validator.isLength(title, { min: 1, max: 255 })) {
    throw Error('Title Field cannot be Empty and cannot be more than 255 characters');
  }
  if (!validator.isLength(article, { min: 1 })) {
    throw Error('Article Field cannot be Empty');
  }
  return models.saveArticle(userId, title, article);
};

const getArticle = articleId => models.getArticle(articleId);

const updateArticle = (userId, articleId, title, article) => {
  if (!validator.isLength(title, { min: 1, max: 255 })) {
    throw Error('Title Field cannot be Empty and cannot be more than 255 characters');
  }
  if (!validator.isLength(article, { min: 1 })) {
    throw Error('Article Field cannot be Empty');
  }
  return models.updateArticle(userId, articleId, title, article);
};

const delArticle = (userId, articleId) => {
  // console.log('called delArticle Services');
  // console.log(userId);
  // console.log(articleId);
  return models.deleteArticle(userId, articleId);
};

const saveArticleComment = (userId, articleId, comment) => {
  if (!validator.isLength(comment, { min: 1 })) {
    throw Error('Comment Field cannot be Empty');
  }
  return models.saveArticleComment(userId, articleId, comment);
};

const getArticleComment = (articleId) => {
  return models.articleComment(articleId);
};

module.exports = {
  newArticle,
  getArticle,
  updateArticle,
  delArticle,
  saveArticleComment,
  getArticleComment,
};
