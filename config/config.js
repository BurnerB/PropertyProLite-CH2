const { Pool } = require('pg');
//connection to postgres


const env = process.env.NODE_ENV;

const database = env ==='test'? process.env.TEST_DATABASE : process.env.DEV_DATABASE;


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: database,
    password: 'password',
    port: process.env.PORT,
  });
// }
// if(process.env.NODE_ENV = "test"){
//   pool = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: 'password',
//     port: process.env.PORT,
//   });
// }


pool.on('connect', () => console.log('connected to the db'));

module.exports = pool;