const inquirer = require('inquirer');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const { viewAllDepartments } = require('./lib/queries');
const connection = require('./db/connection');

async function main() {
    try {
        const action = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'what would you like to do', 
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add Department',
                    'Add Employee',
                    'Add Role'
                ],
            },
        ]);
        // Initialize inquirer prompts here 
        if (action.choice === 'Add Department') {
            const departmentName = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'enter the name of the department:',
                    validate: (value) => {
                        if (value.trim() === '') {
                            return 'Department name cannot be empty.';
                        }
                        return true;
                    },
                },
            ]);
            await Department.addDepartment(departmentName.name);
            console.log('Department added successfully.');
        }

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
