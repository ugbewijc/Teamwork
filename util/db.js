require('dotenv').config();
const { Pool } = require('pg');
// or native libpq bindings
// var pg = require('pg').native

// 'postgres://hfdzyaex:LHI2_1X0-P7byAJyMdS_J_a2B2menBSC@salt.db.elephantsql.com:5432/hfdzyaex'; // Can be found in the Details page

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const runQuery = (query) => {
  pool.query(query)
    .then((res) => {
      // console.log(res);
      pool.end();
      return res;
    })
    .catch((err) => {
      pool.end();
      throw err;
    });
};

module.exports = {
  runQuery,
};
/*
const client = new pg.Client(conString);
const sqlStatement = `SELECT NOW() AS "theTime"`;
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(sqlStatement, (e, result) => {
    if (e) {
      return console.error('error running query', err);
    }
    console.log(result);
    client.end();
  });
}); */
