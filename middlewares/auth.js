const util = require('../util');

const auth = (req, res, next) => {
  const userToken = req.headers.token;
  if (!userToken) {
    res.json({ status: 'error', error: 'User Not Logged In' });
  }
  try {
    const decode = util.verifyUserToken(userToken);
    req.userEmail = decode.email;
    next();/*
    if (util.verifyUserToken(userToken)) {
      next();
    } */
  } catch (e) {
    res.json({ status: 'error', error: 'User Not Logged In' });
  }
};

const adminAuth = (req, res, next) => {
  const userToken = req.headers.token;
  if (!userToken) {
    res.json({ status: 'error', error: 'User Not Logged In' });
  }
  try {
    if (util.verifyAdminToken(userToken)) {
      next();
    }
  } catch (e) {
    res.json({ status: 'error', error: 'User Not Logged In' });
  }
};

module.exports = {
  auth,
  adminAuth,
};
