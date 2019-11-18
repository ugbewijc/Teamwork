require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const runQuery = queryText => (async () => {
  const client = await pool.connect();
  let result;
  try {
    const res = await client.query(queryText);
    result = res.rows;
  } finally {
    client.release();
  }
  return result;
})().catch(() => { throw Error('Database Error'); });


const insertQuery = (queryText, values) => (async () => {
  const client = await pool.connect();
  let result;
  try {
    const res = await client.query(queryText, values);
    result = res.rows;
  } finally {
    client.release();
  }
  return result;
})().catch((e) => { throw Error(`Database Error ${e.message}`); });

module.exports = {
  runQuery,
  insertQuery,
};
