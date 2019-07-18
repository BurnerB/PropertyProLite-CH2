const pool = require('../../config/config');

const dropTables = async () => {
  try{
    const queryText = 'DROP TABLE IF EXISTS users,properties CASCADE';
    await pool.query(queryText);
    await pool.end();
  }catch{
    pool.end();
  }
}

module.exports = {dropTables}

// dropTables();
require('make-runnable');