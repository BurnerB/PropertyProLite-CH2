const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

class Database{
    constructor(){
        this.pool = new Pool(
          {
            user:process.env.USER,
            password:'password',
            Host:process.env.HOST,
            port:process.env.PORT,
            database:process.env.DATABASE
          }
        )
    }

    async query(text, params){
      const conn = await this.pool.connect()
      const response = await conn.query(text, params);
      console.log(response);
      return response;
    }
}
const db = new Database();

db.pool.on('connect', () => {
  console.log('you are now connected to the db');
});

db.pool.on('error', () => {
  console.log('Error with db');
  process.exit(-1);
});

export default db;