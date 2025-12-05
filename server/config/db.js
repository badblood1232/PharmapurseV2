import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Read schema.sql
const sqlpath = path.join(process.cwd(), 'config/schema.sql'); // adjust path
const sql = fs.readFileSync(sqlpath, 'utf8');

async function initializeDB() {
    // 1. Connect without database to create it
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true,
    });

    // 2. Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``);

    // 3. Connect to the database
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true,
    });

    // 4. Execute schema.sql to create tables
    await db.query(sql);

    console.log('Database and tables initialized!');
    return db;
}

// Top-level await (Node 18+ supports this in ES modules)
const db = await initializeDB();

export default db;
