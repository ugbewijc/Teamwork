const validator = require('validator');
const { insertQuery } = require('./dbUtil');

const saveArticle = (userId, title, article) => {
  const eTitle = validator.escape(title);
  const eArticle = validator.escape(article);
  const sqlStatement = `INSERT INTO
      articles(user_id, title, article)
      VALUES($1, $2, $3) RETURNING *`;
  const values = [userId, eTitle, eArticle];
  return insertQuery(sqlStatement, values);
};
// TODO: Get Article by ID from Database
const getArticle = (articleId) => {
  const sqlStatement = 'SELECT * FROM articles WHERE article_id = $1';
  const values = [articleId];
  return insertQuery(sqlStatement, values);
};

const updateArticle = (userId, articleId, title, article) => {
  const eTitle = validator.escape(title);
  const eArticle = validator.escape(article);
  const sqlStatement = `UPDATE articles SET title= $1, article=$2
   WHERE article_id = $3 AND user_id = $4
   RETURNING *`;
  const values = [eTitle, eArticle, articleId, userId];
  return insertQuery(sqlStatement, values);
};

const deleteArticle = (userId, articleId) => {
  const sqlStatement = `delete from articles
  where user_id = $1 AND article_id = $2  RETURNING *`;
  const values = [userId, articleId];
  return insertQuery(sqlStatement, values);
};

const saveArticleComment = (userId, articleId, comment) =>{
  const eComment = validator.escape(comment);
  const sqlStatement = `INSERT INTO
      article_comments(user_id, article_id, comment)
      VALUES($1, $2, $3) RETURNING *`;
  const values = [userId, articleId, eComment];
  return insertQuery(sqlStatement, values);
};

const articleComment = (articleId) => {
  const sqlStatement = `SELECT comment_id as commentId, comment, user_id as authorId
  FROM article_comments
  WHERE article_id = $1`;

  const values = [articleId];
  return insertQuery(sqlStatement, values);
};

module.exports = {
  saveArticle,
  getArticle,
  updateArticle,
  deleteArticle,
  saveArticleComment,
  articleComment,
};
