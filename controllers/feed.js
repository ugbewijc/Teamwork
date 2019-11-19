const services = require('../services');

const getAllFeed = async (req, res) => {
  try {
    const allFeed = await services.getArticlesNGif();
    // console.log(allFeed);
    res.json({
      status: 'success',
      data: allFeed,
    });
  } catch (err) { res.json({ status: 'error', error: err.message }); }
};
module.exports = {
  getAllFeed,
};
