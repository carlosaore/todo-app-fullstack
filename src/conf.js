const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection(process.env.DB_URL);

module.exports = connection;