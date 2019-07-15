const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool(
  {
    user:process.env.USER,
    password:'password',
    Host:process.env.HOST,
    port:process.env.PORT,
    database:process.env.DATABASE
  }
);

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = async () => {
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

  await pool.query(queryText)
  await pool.end();

}
createTables()
