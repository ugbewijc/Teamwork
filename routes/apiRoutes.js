const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controllers');

const apiRouter = express.Router();
/*
apiRouter.post('/v1/articles/:articleId/comment', middleware.auth, controller.postComment);
apiRouter.get('/v1/articles/:articleId', middleware.auth, controller.getArticle);
apiRouter.post('/v1/articles', middleware.auth, controller.createArticle);
apiRouter.patch('/v1/articles/:articleId', middleware.auth, controller.editArticle);
apiRouter.delete('/v1/articles/:articleId', middleware.auth, controller.deleteArticle);
// apiRouter.get('/v1/gifs', middleware.auth, controller.getGif);
apiRouter.get('/v1/gifs/:gifId', middleware.auth, controller.getGif);
apiRouter.post('/v1/gifs/:gifId/comment', middleware.auth, controller.createComment);
apiRouter.delete('/v1/gifs/:gifId', middleware.auth, controller.deleteGif);
apiRouter.post('/v1/gifs', middleware.auth, middleware.uploadM.single('image'), controller.createGif); */
apiRouter.post('/v1/auth/signin', controller.signInUser);
apiRouter.post('/v1/auth/create-user', middleware.adminAuth, controller.createUser);

module.exports = apiRouter;
