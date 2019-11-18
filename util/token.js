const jwt = require('jsonwebtoken');

// const privateKEY = fs.readFileSync('../config/private.js', 'utf8');
const jwtSecretU = 'DevC Challenge 2019';
const jwtSecretA = 'DevChallenge';
const jwtOptions = { algorithm: 'HS256', expiresIn: '1h' };

// Generate Token Using jsonwebtoken

const generateAdminToken = payLoad => jwt.sign({ email: payLoad }, jwtSecretA, jwtOptions);
const verifyAdminToken = token => jwt.verify(token, jwtSecretA, jwtOptions, (err, decod) => {
  if (err) {
    throw Error('User Not Logged In');
  }
  return true;
// decod.email
});

const generateUserToken = payLoad => jwt.sign({ email: payLoad }, jwtSecretU, jwtOptions);
const verifyUserToken = token => jwt.verify(token, jwtSecretU, jwtOptions, (err, decod) => {
  if (err) {
    // return verifyAdminToken(token);
    throw Error('User Not Logged In');
  }
  //   return true;
  return decod;
});

const getEmailFromToken = token => jwt.verify(token, jwtSecretU, jwtOptions, (err, decod) => {
  if (err) {
    // return verifyAdminToken(token);
    throw err;
  }
  return decod.email;
  // return true;
});

module.exports = {
  generateUserToken,
  verifyUserToken,
  generateAdminToken,
  verifyAdminToken,
  getEmailFromToken,
};
