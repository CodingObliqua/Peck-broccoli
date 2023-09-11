// Import the connection module to establish a connection to the database
const connection = require('../db/connection');

// Function to view all roles in the database
async function viewAllRoles() {
    try {
        // Execute a SQL query to select all records from the "role" table
        const [rows, fields] = await connection.query('SELECT * FROM role');
        
        // Return the result (list of roles)
        return rows;
    } catch (error) {
        // If an error occurs, throw it for handling at a higher level
        throw error;
    }
}

// Function to add a new role to the database
async function addRole(roleData) {
    try {
        // Define the SQL query to insert a new role into the "role" table
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        
        // Define the values to be inserted, taken from the roleData object
        const values = [roleData.title, roleData.salary, roleData.department_id];
        
        // Execute the SQL query with the provided values
        await connection.query(query, values);
    } catch (error) {
        // If an error occurs, throw it for handling at a higher level
        throw error;
    }
}

// Export the viewAllRoles and addRole functions for use in other modules
module.exports = {
    viewAllRoles,
    addRole
};