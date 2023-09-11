// Import the 'mysql2' module for database connectivity
const mysql = require('mysql2');

// Create a database connection pool with connection details
const connection = mysql.createPool({
    host: 'localhost',     // Database host (e.g., 'localhost' for local development)
    user: 'root',          // Database user
    password: 'Changeme',  // Database user's password
    database: 'employee_tracker',  // Database name
});

// Export the connection object with promise-based queries for use in other modules
module.exports = connection.promise();