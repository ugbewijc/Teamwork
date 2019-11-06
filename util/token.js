const jwt = require('jsonwebtoken');

// const privateKEY = fs.readFileSync('../config/private.js', 'utf8');
const jwtSecretU = 'DevC Challenge 2019';
const jwtSecretA = 'DevChallenge';
const jwtOptions = { algorithm: 'HS256', expiresIn: '1h' };

// Generate Token Using jsonwebtoken
const generateUserToken = payLoad => jwt.sign({ email: payLoad }, jwtSecretU, jwtOptions);
const verifyUserToken = token => jwt.verify(token, jwtSecretU, jwtOptions);

const generateAdminToken = payLoad => jwt.sign({ email: payLoad }, jwtSecretA, jwtOptions);
const verifyAdminToken = token => jwt.verify(token, jwtSecretA, jwtOptions);

module.exports = {
  generateUserToken,
  verifyUserToken,
  generateAdminToken,
  verifyAdminToken,
};
