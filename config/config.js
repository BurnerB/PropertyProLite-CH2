const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: 'password',
  port: process.env.PORT,
});

pool.on('connect', () => console.log('connected to the db'));

module.exports = pool;