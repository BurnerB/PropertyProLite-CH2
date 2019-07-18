const pool = require('../../config/config');

pool.on('connect', () => {
  console.log('creating tables..');
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
      );
      CREATE TABLE IF NOT EXISTS properties(
        id serial PRIMARY KEY,
        owner INTEGER REFERENCES users (id) ON DELETE CASCADE,
        ownerEmail VARCHAR(128),
        status VARCHAR(128) NOT NULL,
        type VARCHAR(128) NOT NULL,
        state VARCHAR(128) NOT NULL,
        city VARCHAR(128) NOT NULL,
        price DECIMAL NOT NULL, 
        address VARCHAR(128) NOT NULL,
        image_url VARCHAR(120),
        created_On TIMESTAMP DEFAULT NOW()
      )`;

  await pool.query(queryText)
  await pool.end();
}

const dropTables = async () => {
  try{
    const queryText = 'DROP TABLE IF EXISTS users';
    await pool.query(queryText);
    await pool.end();
  }catch{
    pool.end();
  }
}

// createTables();
module.exports = {createTables,
                  dropTables}


require('make-runnable');