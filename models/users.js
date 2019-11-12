require('dotenv').config();
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { runQuery, insertQuery } = require('./dbUtil');

const salt = bcrypt.genSaltSync(10);

const getUserByEmail = (email) => {
  if (email === process.env.AEM) {
    return process.env.AID;
  }
  const userEmail = validator.escape(email); // escape input
  const sqlStatement = `select * from users where email = '${userEmail}'`;
  return runQuery(sqlStatement).then(res => res);
};

const getUserByMailAndPwd = (email, password) => {
  try {
    if ((email === process.env.AEM) && (password === process.env.APWD)) {
      return { uid: process.env.AID, isAdmin: true };
    }
    return getUserByEmail(email).then((uid) => {
      if (!uid[0]) {
        throw new Error('Invalid Email or Password');
      }
      // console.log(uid);
      if (bcrypt.compareSync(password, uid[0].password)) {
        return { uid: uid[0].user_id, isAdmin: false };
      }
    });
  } catch (e) {
    throw new Error('Invalid Email or Password');
  }
};

const saveUser = (items) => {
  const userEmail = validator.escape(items.email); // escape input
  const hashPwd = bcrypt.hashSync(items.password, salt);
  const sqlStatement = `INSERT INTO
      users(firstName, lastName, email, password, gender, address, jobRole, department)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const values = [
    items.firstName,
    items.lastName,
    userEmail,
    hashPwd,
    items.gender,
    items.address,
    items.jobRole,
    items.department,
  ];
  return insertQuery(sqlStatement, values).then(result => result.user_id);
};

module.exports = {
  getUserByMailAndPwd,
  getUserByEmail,
  saveUser,
};
