const user = require('./user');
const gifs = require('./gifs');


module.exports = {
  signInUser: user.signInUser,
  createUser: user.createUser,
  createGif: gifs.createGif,
};
