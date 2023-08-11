const mysql = require('mysql2');

// Connection 
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Changeme',
    database: 'employee_tracker',
});

module.exports = connection.promise();