const util = require('../util');

const auth = (req, res, next) => {
  const userToken = req.headers.token;
  if (!userToken) {
    res.json({ status: 'error', error: 'User Not Logged In' });
  }
  try {
    if (util.verifyUserToken(userToken)) {
      next();
    }
    if (util.verifyAdminToken(userToken)) { // check if the user is admin
      next();
    }
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
