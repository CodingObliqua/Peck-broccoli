const connection = require('../db/connection');

async function viewAllDepartments() {
    try {
        const [rows, fields] = await connection.query('SELECT * FROM department');
        return rows;
    } catch(error) {
        throw error;
    }

}

async function addDepartment(departmentName) {
    try {
        await connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    } catch(error) {
        throw error;
    }

}

module.exports = {
    viewAllDepartments,
    addDepartment
};