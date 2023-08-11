const connection = require('../db/connection');

async function viewAllRoles() {
    try {
        const [rows, fields] = await connection.query('SELECT * FROM role');
        return rows;
    } catch(error) {
        throw error;
    }

}
async function addRole(roleData) {
    try {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const values = [roleData.title, roleData.salary, roleData.department_id];
        await connection.query(query, values); 
    } catch(error) {
        throw error;
    }
}

module.exports = {
    viewAllRoles,
    addRole
};