const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controllers');


<<<<<<< HEAD
<<<<<<< HEAD
const apiRouter = express.Router();
=======
const apiRouter = express.Router();/*
>>>>>>> user
=======
const apiRouter = express.Router();/*
>>>>>>> user
apiRouter.post('/v1/articles/:articleId/comment', middleware.auth, controller.postComment);
apiRouter.get('/v1/articles/:articleId', middleware.auth, controller.getArticle);
apiRouter.post('/v1/articles', middleware.auth, controller.createArticle);
apiRouter.patch('/v1/articles/:articleId', middleware.auth, controller.editArticle);
apiRouter.delete('/v1/articles/:articleId', middleware.auth, controller.deleteArticle);
// apiRouter.get('/v1/gifs', middleware.auth, controller.getGif);
apiRouter.get('/v1/gifs/:gifId', middleware.auth, controller.getGif);
apiRouter.post('/v1/gifs/:gifId/comment', middleware.auth, controller.createComment);
apiRouter.delete('/v1/gifs/:gifId', middleware.auth, controller.deleteGif);
<<<<<<< HEAD
<<<<<<< HEAD
apiRouter.post('/v1/gifs', middleware.auth, middleware.uploadM.single('image'), controller.createGif);
apiRouter.post('/v1/auth/signin', controller.signInUser);
apiRouter.post('/v1/auth/create-user', middleware.adminAuth, controller.createUser);

apiRouter.post('/comments', (req, res) => {
  res.send('An alligator approaches!');
});
apiRouter.post('/subscriptions', (req, res) => {
  res.send('An alligator approaches!');
});
=======
apiRouter.post('/v1/gifs', middleware.auth, middleware.uploadM.single('image'), controller.createGif); */
apiRouter.post('/v1/auth/signin', controller.signInUser);
apiRouter.post('/v1/auth/create-user', middleware.adminAuth, controller.createUser);
>>>>>>> user
=======
apiRouter.post('/v1/gifs', middleware.auth, middleware.uploadM.single('image'), controller.createGif); */
apiRouter.post('/v1/auth/signin', controller.signInUser);
apiRouter.post('/v1/auth/create-user', middleware.adminAuth, controller.createUser);
>>>>>>> user

module.exports = apiRouter;
