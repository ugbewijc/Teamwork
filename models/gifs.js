const validator = require('validator');
const { insertQuery } = require('./dbUtil');

const saveGifToDB = (userId, gifTitle, fileName, gifUrl) => {
  const sqlStatement = `INSERT INTO
      gifs(user_id, title, gifName, gifUrl)
      VALUES($1, $2, $3, $4) RETURNING *`;
  const values = [userId, gifTitle, fileName, gifUrl];
  return insertQuery(sqlStatement, values);
};

const getSingleGif = (id) => {
  const sqlStatement = 'select * from gifs where gif_id = $1';
  const values = [id];
  return insertQuery(sqlStatement, values);
};

const deleteGif = (gifId) => {
  const sqlStatement = 'delete from gifs where gif_id = $1';
  const values = [gifId];
  return insertQuery(sqlStatement, values);
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
  const sqlStatement = 'select comment_id as commentId,user_id as authorId, comment from gifs_comments where gif_id = $1';
  const values = [gifId];
  return insertQuery(sqlStatement, values);
};

module.exports = {
  saveGifToDB,
  getSingleGif,
  deleteGif,
  saveGifComment,
  gifComment,
};
