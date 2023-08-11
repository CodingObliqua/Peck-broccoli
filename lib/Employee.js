const connection = require('../db/connection');

async function viewAllEmployees() {
     try {
        const [rows, fields] = await connection.query('SELECT * FROM employee');
        return rows;
    } catch(error) {
        throw error;
    }

}

async function addEmployee(employeeData) { 
    try {
        const { firstName, lastName, roleID, managerId } = employeeData;
        
        let sql = 'INSERT INTO employee (first_name, last_name, role_id';
        const values = [firstName, lastName, roleID];

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
        throw error;
    }
}

async function updateEmployeeRole(employeeId, newRoleId) {
    try {
        await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    } catch(error) {
        throw error;
    }
}

module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole
};
