const pool = require('../../config/config');

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = async () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id serial PRIMARY KEY,
        firstname VARCHAR(500),
        lastname VARCHAR(500),
        email VARCHAR(500) ,
        password VARCHAR(500),
        address VARCHAR(500) ,
        is_Agent BOOL DEFAULT false,
        is_Admin BOOL DEFAULT false,
        created_On TIMESTAMP DEFAULT NOW()
      )`;

  await pool.query(queryText)
  await pool.end();

}
createTables();
