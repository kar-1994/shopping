const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: process.env.CON_LIMIT,
    database: process.env.DATABASE
});

module.exports = pool;
