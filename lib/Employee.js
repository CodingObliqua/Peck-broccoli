const connection = require('../db/connection');

async function viewAllEmployees() {
     try {
        const [rows, fields] = await connection.query('SELECT * FROM employee');
    } catch(error) {
        console.error('Error in viewAllEmployees:', error); // Add this line
        throw error;
    }

}

async function addEmployee(employeeData) { 
    try {
        const { firstName, lastName, roleId, managerId } = employeeData;
        console.log('Adding employee:', firstName, lastName, roleId, managerId); // Add this line
       
        let sql = 'INSERT INTO employee (first_name, last_name, role_id';
        const values = [firstName, lastName, roleId];

        if (managerId) {
            sql += ', manager_id';
            values.push(managerId);
        }

        sql += ') VALUES (?, ?, ?';
        
        if (managerId) {
            sql += ', ?';
        }

        sql += ')';
        
        await connection.query(sql, values);
    } catch(error) {
        console.error('Error in addEmployee:', error); // Add this line
        throw error;
    }
}

async function updateEmployeeRole(employeeId, newRoleId) {
    try {
        console.log('Updating role for employee ID:', employeeId, 'New Role Id:', newRoleId); // Add this line
        await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    } catch(error) {
        console.error('Error in updateEmployeeRole:', error); // Add this line
        throw error;
    }
}

module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole
};
