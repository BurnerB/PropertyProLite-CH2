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
        let pool = await this.pool.connect();
        const response = await pool.query(text,params);
        console.log(response.row);
        return response;
    }
}
const db = new Database();

export default db;