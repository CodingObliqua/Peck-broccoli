// Import required modules and files
const inquirer = require('inquirer');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const { viewAllDepartments } = require('./lib/queries');
const connection = require('./db/connection');

// Define the main asynchronous function
async function main() {
    try {
        // Prompt the user to select an action
        const action = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
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

        // Initialize inquirer prompts based on user choice
        if (action.choice === 'Add Department') {
            // Prompt for department name
            const departmentName = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the name of the department:',
                    validate: (value) => {
                        if (value.trim() === '') {
                            return 'Department name cannot be empty.';
                        }
                        return true;
                    },
                },
            ]);
            
            // Add a new department to the database
            await Department.addDepartment(departmentName.name);
            console.log('Department added successfully.');
        } else if (action.choice === 'Add Employee') {
            // Prompt for employee data
            const employeeData = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "Enter employee's first name:",
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "Enter employee's last name:",
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: "Enter the employee's role ID:",
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: "Enter the employee's manager ID (leave empty if N/A):",
                },
            ]);
            
            // Add a new employee to the database
            await Employee.addEmployee(employeeData.firstName, employeeData.lastName, employeeData.roleId, employeeData.managerId);
            console.log('Employee added successfully');
        } else if (action.choice === 'View All Employees') {
            // View all employees and display the result
            const employee = await Employee.viewAllEmployees();
            console.log(employee);
        } else if (action.choice === 'Add Role') {
            // Prompt for role data
            const roleData = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: "Enter the title of the role:",
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "Enter the salary of the role:",
                },
                {
                    type: 'input',
                    name: 'department_id',
                    message: "Enter the department ID for the role:",
                },
            ]);
            
            // Add a new role to the database
            await Role.addRole(roleData);
            console.log('Role added successfully.');
        } else if (action.choice === 'View All Roles') {
            // View all roles and display the result
            const roles = await Role.viewAllRoles();
            console.log(roles);
        }

        // View all departments and display the result
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

// Call the main function to start the application
main();