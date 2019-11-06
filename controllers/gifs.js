const createGif = (req, res, next) => {
  res.json({ status: 'Success Create Gif is active' });
  next();
};

module.exports = {
  createGif,
};
