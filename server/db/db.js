const { Pool } = require('pg');
// const dotenv = require('dotenv');

// dotenv.config();
const pool = new Pool(
  {
    user:'abu',
    password:'password',
    Host:'localhost',
    port:5432,
    database:'propertypro'
  }
);

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        _id serial PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        is_Agent BOOL DEFAULT 'false',
        is_Admin BOOL DEFAULT 'false',
        created_On TIMESTAMP NOT NULL DEFAULT NOW()
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
createTables()
