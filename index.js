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
        } else if (action.choice === 'Add Employee') {
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
                    name: 'roleID',
                    message: "Enter the employee's role ID:",
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: "Enter the employee's manager ID (leave empty if N/A):", 
                },
            ]);
            await Employee.addEmployee(employeeData.firstName, employeeData.lastName, employeeData.roleId, employeeData.managerId);
            console.log('Employee added successfully');
        } else if (action.choice === 'View All Employees') {
            const employee = await Employee.viewAllEmployees();
            console.log(employee);
        } else  if (action.choice === 'Add Role') {
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
            
            await Role.addRole(roleData);
            console.log('Role added successfully.');
        } else if (action.choice === 'View All Roles') {
            const roles = await Role.viewAllRoles();
            console.log(roles);
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
