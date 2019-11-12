const validator = require('validator');
const { runQuery, insertQuery } = require('./dbUtil');

const saveGifToDB = (userId, gifTitle, fileName, gifUrl) => {
  const sqlStatement = `INSERT INTO
      gifs(user_id, title, gifName, gifUrl)
      VALUES($1, $2, $3, $4) RETURNING *`;
  const values = [userId, gifTitle, fileName, gifUrl];
  return insertQuery(sqlStatement, values);
};

const getSingleGif = (id) => {
  const gifId = validator.escape(id); // escape input
  const sqlStatement = `select * from gifs where gif_id = '${gifId}'`;
  return runQuery(sqlStatement);
};

const deleteGif = (gifId) => {
  try {
    const sqlStatement = `delete from gifs where gif_id = '${gifId}'`;
    return runQuery(sqlStatement);
  } catch (e) {
    throw Error('Could Not Update Database');
  }
};

const saveGifComment = (userId, gifId, comment) => {
  try {
    const eComment = validator.escape(comment);
    const sqlStatement = `INSERT INTO
        gifs_comments(user_id, gif_id, comment)
        VALUES($1, $2, $3) RETURNING *`;
    const values = [userId, gifId, eComment];
    return insertQuery(sqlStatement, values);
  } catch (e) {
    throw Error('Could not update database');
  }
};

const gifComment = (gifId) => {
  const sqlStatement = `select comment_id as commentId,user_id as authorId, comment from gifs_comments where gif_id = '${gifId}'`;
  return runQuery(sqlStatement);
};

module.exports = {
  saveGifToDB,
  getSingleGif,
  deleteGif,
  saveGifComment,
  gifComment,
};
