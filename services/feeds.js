const models = require('../models');

const getArticlesNGif = () => models.allFeed();

module.exports = {
  getArticlesNGif,
};
