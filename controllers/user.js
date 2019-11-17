const util = require('../util');
const services = require('../services');

const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let tokenId;
    const isUserValid = await services.userValidation(email, password);
    if (isUserValid === undefined) {
      throw new Error('Invalid Email or password');
    }
    if (isUserValid.isAdmin) {
      tokenId = await util.generateAdminToken(email);
    } else { // generateAdminToken
      tokenId = await util.generateUserToken(email);
    }
    const isUser = await isUserValid.uid;
    // res.setHeader('token', tokenId);
    res.json({ status: 'success', data: { token: tokenId, userId: isUser } });
  } catch (err) {
    res.json({ status: 'error', error: err.message });
  }
  next();
};

const createUser = async (req, res, next) => {
  try {
    // TODO: Check if email exist
    const result = await services.doUserEmailExsit(req.body.email);
    if (result) {
      throw new Error('Email already exist');
    }
    const newUserId = await services.createNewUser(req.body).then(uid => uid[0].user_id);
    const tokenId = await util.generateUserToken(req.body.email);
    res.json({ status: 'success', data: { message: 'User account successfully created', token: tokenId, userid: newUserId } });
  } catch (e) {
    res.json({ status: 'error ', error: e.message });
  }
  next();
};

module.exports = {
  signInUser,
  createUser,
};
