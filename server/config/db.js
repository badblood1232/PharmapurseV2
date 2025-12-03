const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const fs = require('fs');
const path = require('path');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const sqlpath = path.join(__dirname, 'schema.sql');
const sql = fs.readFileSync(sqlpath, 'utf8');

db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`, (err) => {
   if (err) throw err;
   console.log('Database Created!');
   const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
    connection.query(sql, (err) => {
    if (err) {
        console.log(err);
    }
});
    module.exports = connection;
});





