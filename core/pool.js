
const util = require('util');
const mysql = require('mysql');
require('dotenv').config();
const dotenv = require('dotenv');
// const path = require('path');

dotenv.config({ path: '../.env' });


/**
 * Connection to the database.
 * */


const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

pool.getConnection((err, connection) => {
// pool.connect((err, connection) => {
    if(err)
        throw err;
        console.error("Something went wrong connecting to the database");
        console.error(err);

    if(connection)
        connection.release();
    return;

});

pool.query = util.promisify(pool.query);

module.exports = pool;