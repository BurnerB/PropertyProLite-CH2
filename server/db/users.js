import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString:process.env.DATABASE_URL
});

pool.on('connect',() =>{
    console.log('connected to the db');
});

const createTable = () =>{
    const queryText = 
        `CREATE TABLE IF NOT EXISTS
            user(
                id UUID PRIMARY KEY,
                email VARCHAR(50) NOT NULL,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                createdON TIMESTAMP
            )`;
    
    pool.query(queryText)
        .then((res) =>{
            console.log(res);
            pool.end();
        })
        .catch((error)=>{
            console.log(error);
            pool.end();
        })
}

const dropTable = () => {
    const queryText = 'DROP TABLE IF EXISTS user';
    pool.query(queryText)
        .then((res) =>{
            console.log(res);
            pool.end();
        })
        .catch((error)=>{
            console.log(error);
            pool.end();
        });
}

pool.on('remove', ()=>{
    console.log('client removed');
    process.exit(0);
});

export default { createTable, dropTable };

// require('make-runnable');

