const util = require('../util');
const services = require('../services');

const createArticle = async (req, res) => {
  try {
    // TODO: Get user email from token
    const userEmail = await util.getEmailFromToken(req.headers.token);
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(userEmail).then(result => result.user_id);
    // TODO: Save Article
    const article = await services.newArticle(userId, req.body.title, req.body.article);
    res.json({
      status: 'Success',
      data: {
        message: 'Article successfully posted',
        articleId: article.article_id,
        createdOn: article.created_on,
        title: article.title,
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

const getArticle = async (req, res) => {

  try {
    const articleId = parseInt(req.params.articleId, 10);
    // TODO: Get GIF Details
    const articleDetails = await services.getArticle(articleId);
    // TODO: Get GIF Comment
    const articleComment = await services.getArticleComment(articleId);
    res.json({
      status: 'Success',
      data: {
        id: articleDetails.article_id,
        createdOn: articleDetails.created_on,
        title: articleDetails.title,
        article: articleDetails.article,
        comments: [articleComment],
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

const editArticle = async (req, res) => {
  try {
    // TODO: Get user email from token
    const userEmail = await util.getEmailFromToken(req.headers.token);
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(userEmail).then(result => result.user_id);
    // TODO: Update Article
    const articleId = parseInt(req.params.articleId, 10);
    const article = await services.updateArticle(userId, articleId, req.body.title, req.body.article);
    res.json({
      status: 'Success',
      data: {
        message: 'Article successfully updated',
        title: article.title,
        article: article.article,
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    // TODO: Get user email from token
    const userEmail = await util.getEmailFromToken(req.headers.token);
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(userEmail).then(result => result.user_id);
    // TODO: Update Article
    const articleId = parseInt(req.params.articleId, 10);
    // const article =
    await services.delArticle(userId, articleId);
    res.json({
      status: 'Success',
      data: {
        message: 'Article successfully deleted',
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

const postComment = async (req, res) => {
  try {
    if (!req.body.comment) {
      throw Error('Comment not found');
    }
    // TODO: Get user email from token
    const userEmail = await util.getEmailFromToken(req.headers.token);
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(userEmail).then(result => result.user_id);
    // TODO: Save Comment
    const articleId = parseInt(req.params.articleId, 10);
    const saveResponse = await services.saveArticleComment(userId, articleId, req.body.comment);
    const articleDetails = await services.getArticle(articleId);
    res.json({
      status: 'Success',
      data: {
        message: 'Comment successfully created',
        createdOn: saveResponse.created_on,
        articleTitle: articleDetails.title,
        article: articleDetails.article,
        comment: saveResponse.comment,
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

module.exports = {
  createArticle,
  getArticle,
  editArticle,
  deleteArticle,
  postComment,
};
