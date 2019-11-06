const validator = require('validator');
const models = require('../models');

const userValidation = (email, pwd) => {
  /*
  check if user is valid,
  throw error for invalid user Credentials
  return user ID for valid users
  */
  try {
    const isUserCredentialsValid = (validator.isEmail(email) && validator.isLength(pwd, { min: 1 }));
    if (!isUserCredentialsValid) {
      throw new Error('Invalid User Credentials');
    }
    return models.getUserByMailAndPwd(email, pwd);
  } catch (e) {
    throw e;
  }
};

const doUserEmailExsit = (email) => {
  // Validate Email
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }
  // check if email exsit
  try {
    return models.getUserByEmail(email).then((res) => {
      // console.log(res[0].email);
      if (res[0] === undefined) {
        return false;
      }
      if (res[0].email) {
        return true;
      }
    });
  } catch (e) {
    return true;
  }
};

const createNewUser = (reqBody) => {
  // console.log(' createNewUser on Service is Called');
  const errArray = [];
  if (!validator.isLength(reqBody.firstName, { min: 1 })) { errArray.push('First Name is Required'); }
  if (!validator.isLength(reqBody.lastName, { min: 1 })) { errArray.push(' Last Name is Required'); }
  if (!validator.isEmail(reqBody.email)) { errArray.push(' Valid Email Address is Required'); }
  if (!validator.isLength(reqBody.password, { min: 1 })) { errArray.push(' Password cannot be empty'); }
  if (!validator.isLength(reqBody.gender, { min: 1 })) { errArray.push(' Gender is Required'); }
  if (!validator.isLength(reqBody.address, { min: 1 })) { errArray.push(' Address is Required'); }
  if (!validator.isLength(reqBody.jobRole, { min: 1 })) { errArray.push(' Job ROle is Required'); }
  if (!validator.isLength(reqBody.department, { min: 1 })) { errArray.push(' Department is Required'); }
  if (errArray.length > 0) { throw new Error(errArray); }

  try {
    return models.saveUser(reqBody);
  } catch (e) {
    throw e;
  }
};


module.exports = {
  userValidation,
  doUserEmailExsit,
  createNewUser,
};
