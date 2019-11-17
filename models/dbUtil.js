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
    result = await res.rows;
  } finally {
    client.release();
  }
  return result;
<<<<<<< HEAD
})().catch((e) => { throw Error(`Could not update database. ${e.message}`); });

const getUserByMailnPwd = queryText => (async () => {
  const client = await pool.connect();
  let result;
  try {
    const res = await client.query(queryText);
    result = res.rows[0].user_id;
  } finally {
    client.release();
  }
  return result;
})().catch((e) => { throw Error(`Could not update database. ${e.message}`); });
=======
})().catch((e) => { throw Error('Database Error'); });

>>>>>>> user

const insertQuery = (queryText, values) => (async () => {
  const client = await pool.connect();
  let result;
  try {
    const res = await client.query(queryText, values);
<<<<<<< HEAD
    result = await res.rows;
=======
    result = res.rows;
>>>>>>> user
  } finally {
    client.release();
  }
  return result;
<<<<<<< HEAD
})().catch((e) => { throw Error(`Could not update database. ${e.message}`); });
=======
})().catch((e) => { throw Error(`Database Error ${e.message}`); });
>>>>>>> user

module.exports = {
  runQuery,
  insertQuery,
};

/*   pool.query('SELECT NOW()', (err, res) => {
  //  console.log(err, res);
  // console.log(res.rows);
    resolve(res.rows);
    // pool.end();
    // return ('we are in insertQuery')
    console.log (reslt);
  }); */

  // return reslt;
  /* pool
    .connect()
    .then((client) => {
    // return
      client
        .query(queryText, values)
        .then((res) => {
          client.release();
          // return JSON.parse(res.rows[0]);
          console.log(res.rows[0])
        })
        .catch((e) => {
          client.release();
        // console.log(err.stack)
        });
    });
*/
  // return reslt;

  /*
pool
  .query(queryText, values)
  .then((res) => {  reslt.user_id = res.rows[0].user_id }) // brianc console.log()
  .catch(err => console.error('Error executing query', err.stack))
   let resul;
  pool
    .connect()
    .then(client => client
      .query(queryText, values)
      .then((res) => {
        client.release();
        resul = res.rows[0].user_id;
        // console.log(resul);
        // return res.rows[0];
        // return true;
        // console.log(res.rows[0]);
      })
      .catch((e) => {
        client.release();
        // console.log(e.stack);
      }));

  console.log(resul); */

  /* (async () => {
    let reslt;
    const client = await pool.connect();
    try {
      const res = await pool.query(queryText, values);
      reslt = await res.rows[0];
      // return ;
      console.log(reslt.user_id);

      // const rows = await client.query(queryText, values);
      // reslt = [...res.rows[0]];
      // console.log(res);
      // console.log(res.rows[0]);
      // reslt.userID = res.rows[0].user_id;
      // reslt.push(res.rows[0]);
      // return res.rows[0];
    } finally {
      client.release();
      // console.log(`from insert statement ${reslt.rows[0]}`);
    }


    // console.log(reslt);
    // return await reslt.rows[0];
    //
  })().catch((e) => { throw e; }); */
  // console.log(reslt.user_id);
  // console.log(reslt);

  /*
pool
  .query(queryText, values)
  .then((res) => {  reslt.user_id = res.rows[0].user_id }) // brianc console.log()
  .catch(err => console.error('Error executing query', err.stack))
   let resul;
  pool
    .connect()
    .then(client => client
      .query(queryText, values)
      .then((res) => {
        client.release();
        resul = res.rows[0].user_id;
        // console.log(resul);
        // return res.rows[0];
        // return true;
        // console.log(res.rows[0]);
      })
      .catch((e) => {
        client.release();
        // console.log(e.stack);
      }));

  console.log(resul); */

  /* (async () => {
    let reslt;
    const client = await pool.connect();
    try {
      const res = await pool.query(queryText, values);
      reslt = await res.rows[0];
      // return ;
      console.log(reslt.user_id);

      // const rows = await client.query(queryText, values);
      // reslt = [...res.rows[0]];
      // console.log(res);
      // console.log(res.rows[0]);
      // reslt.userID = res.rows[0].user_id;
      // reslt.push(res.rows[0]);
      // return res.rows[0];
    } finally {
      client.release();
      // console.log(`from insert statement ${reslt.rows[0]}`);
    }


    // console.log(reslt);
    // return await reslt.rows[0];
    //
  })().catch((e) => { throw e; }); */
  // console.log(reslt.user_id);
  // console.log(reslt);
