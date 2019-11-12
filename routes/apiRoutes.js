const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controllers');


const apiRouter = express.Router();
// apiRouter.get('/v1/gifs', middleware.auth, controller.getGif);
apiRouter.get('/v1/gifs/:gifId', middleware.auth, controller.getGif);
apiRouter.post('/v1/gifs/:gifId/comment', middleware.auth, controller.createComment);
apiRouter.delete('/v1/gifs/:gifId', middleware.auth, controller.deleteGif);
apiRouter.post('/v1/gifs', middleware.auth, middleware.uploadM.single('image'), controller.createGif);
apiRouter.post('/v1/auth/signin', controller.signInUser);
apiRouter.post('/v1/auth/create-user', middleware.adminAuth, controller.createUser);

apiRouter.post('/comments', (req, res) => {
  res.send('An alligator approaches!');
});
apiRouter.post('/subscriptions', (req, res) => {
  res.send('An alligator approaches!');
});

module.exports = apiRouter;
