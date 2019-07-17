const pool = require('../../config/config');

const dropTables = async () => {
  try{
    const queryText = 'DROP TABLE IF EXISTS users';
    await pool.query(queryText);
    await pool.end();
  }catch{
    console.log(err);
    pool.end();
  }
}

dropTables();