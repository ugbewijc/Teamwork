require('dotenv').config();
const bcrypt = require('bcryptjs');
const { insertQuery } = require('./dbUtil');

const salt = bcrypt.genSaltSync(10);

const getUserByEmail = (email) => {
  if (email === process.env.AEM) {
    return Number(process.env.AID);
    // return process.env.AID;
  }
  const sqlStatement = 'select * from users where email = $1';
  const values = [email];
  return insertQuery(sqlStatement, values);
};

const getUserByMailAndPwd = (email, password) => {
  try {
    if ((email === process.env.AEM) && (password === process.env.APWD)) {
      return { uid: Number(process.env.AID), isAdmin: true };
    }
<<<<<<< HEAD
    return getUserByEmail(email).then((uid) => {
      if (!uid[0]) {
        throw new Error('Invalid Email or Password');
=======
    return getUserByEmail(email).then((user) => {
      if (!user[0].password) {
        throw Error('Invalid Email or Password');
>>>>>>> user
      }
      if (bcrypt.compareSync(password, user[0].password)) {
        return { uid: user[0].user_id, isAdmin: false };
      }
    });
  } catch (e) {
    throw Error('Invalid Email or Password');
  }
};

const saveUser = (items) => {
  const hashPwd = bcrypt.hashSync(items.password, salt);
  const sqlStatement = `INSERT INTO
      users(firstName, lastName, email, password, gender, address, jobRole, department)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
  const values = [
    items.firstName,
    items.lastName,
    items.email,
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
