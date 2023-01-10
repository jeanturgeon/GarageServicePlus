// #### Connection à la DB ####
import mysql from 'mysql';
import dotenv from 'dotenv';

// Info de connection avec le .env
dotenv.config();
const con = mysql.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
});

export default con;