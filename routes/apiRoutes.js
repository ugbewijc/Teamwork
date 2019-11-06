const express = require('express');
const middleware = require('../middlewares');
const controller = require('../controllers');

const apiRouter = express.Router();

apiRouter.post('/v1/auth/signin', controller.signInUser);
apiRouter.post('/v1/auth/create-user', middleware.adminAuth, controller.createUser);
apiRouter.post('/v1/auth/gifs', middleware.auth, controller.createUser);
/* apiRouter.get('/gifs', (req, res) => {
  res.send('Gifs Route is working!');
}); */
apiRouter.post('/comments', (req, res) => {
  res.send('An alligator approaches!');
});
apiRouter.post('/subscriptions', (req, res) => {
  res.send('An alligator approaches!');
});

module.exports = apiRouter;
