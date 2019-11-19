const { insertQuery } = require('./dbUtil');

const allFeed = () => {
  const sqlStatement = `select DISTINCT article_id id, created_on createdOn, title, article AS "article/url", user_id authorId
  from articles
  UNION ALL
  select DISTINCT gif_id id, created_on createdOn, title, gifurl "article/url", user_id authorId
  from gifs
  order by createdOn desc`;
  const values = [];
  return insertQuery(sqlStatement, values);
};

module.exports = {
  allFeed,
};
