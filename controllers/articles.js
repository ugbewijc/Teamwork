const services = require('../services');

const createArticle = async (req, res) => {
  try {
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(req.userEmail).then(result => result.user_id);
    // TODO: Save Article
    const article = await services.newArticle(userId, req.body.title, req.body.article);
    res.json({
      status: 'success',
      data: {
        message: 'Article successfully posted',
        articleId: article[0].article_id,
        createdOn: article[0].created_on,
        title: article[0].title,
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
    // Throw Error if article is not found
    if (articleDetails.length <= 0) {
      throw Error('Article Not Found');
    }
    // TODO: Get Article Comment By ID
    const articleComment = await services.getArticleComment(articleId);
    res.json({
      status: 'success',
      data: {
        id: articleDetails[0].article_id,
        createdOn: articleDetails[0].created_on,
        title: articleDetails[0].title,
        article: articleDetails[0].article,
        comments: [articleComment[0]],
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

const editArticle = async (req, res) => {
  try {
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(req.userEmail).then(result => result.user_id);
    // TODO: Update Article
    const articleId = parseInt(req.params.articleId, 10);
    const article = await services.updateArticle(userId, articleId, req.body.title, req.body.article);
    if (article.length <= 0) {
      throw Error('You can not edit this article');
    }
    res.json({
      status: 'success',
      data: {
        message: 'Article successfully updated',
        title: article[0].title,
        article: article[0].article,
      },
    });
  } catch (e) {
    res.json({ status: 'error', error: e.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(req.userEmail).then(result => result.user_id);
    // TODO: Update Article
    const articleId = parseInt(req.params.articleId, 10);
    await services.delArticle(userId, articleId);
    res.json({
      status: 'success',
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
    // TODO: Get User ID from database
    const userId = await services.getUserByEmail(req.userEmail).then(result => result.user_id);
    // TODO: Save Comment
    const articleId = parseInt(req.params.articleId, 10);
    const saveResponse = await services.saveArticleComment(userId, articleId, req.body.comment);
    const articleDetails = await services.getArticle(articleId);
    res.json({
      status: 'success',
      data: {
        message: 'Comment successfully created',
        createdOn: saveResponse[0].created_on,
        articleTitle: articleDetails[0].title,
        article: articleDetails[0].article,
        comment: saveResponse[0].comment,
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
