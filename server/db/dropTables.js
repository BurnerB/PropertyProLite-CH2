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

const dropTables = async() => {
  const queryText = 'DROP TABLE IF EXISTS users';
  await pool.query(queryText)
  await pool.end();
    }
    
pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
    });

dropTables();
