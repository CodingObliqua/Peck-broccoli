const inquirer = require('inquirer');
const { viewAllDepartments } = require('./lib/queries');
const connection = require('./db/connection');

async function main() {
    try {
        // Initialize inquirer prompts here 
        
        // View all departments
        const departments = await viewAllDepartments();
        console.log(departments);
    
        // Perform other actions based on user input
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // Close the database connection if needed
        await connection.end();
      }
    }
    
    main();
