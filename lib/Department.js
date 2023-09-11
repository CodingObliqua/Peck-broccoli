// Import the connection module to establish a connection to the database
const connection = require('../db/connection');

// Function to view all departments in the database
async function viewAllDepartments() {
    try {
        // Execute a SQL query to select all records from the "department" table
        const [rows, fields] = await connection.query('SELECT * FROM department');
        
        // Return the result (list of departments)
        return rows;
    } catch (error) {
        // If an error occurs, throw it for handling at a higher level
        throw error;
    }
}

// Function to add a new department to the database
async function addDepartment(departmentName) {
    try {
        // Execute a SQL query to insert a new department into the "department" table
        await connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    } catch (error) {
        // If an error occurs, throw it for handling at a higher level
        throw error;
    }
}

// Export the viewAllDepartments and addDepartment functions for use in other modules
module.exports = {
    viewAllDepartments,
    addDepartment
};