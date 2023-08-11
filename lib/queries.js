const connection = require('../db/connection');


//View ALL departments
async function viewAllDepartments() {
    
    try {
        const [rows, fields] = await connection.query('SELECT * FROM department');
        return rows;
    } catch(error) {
        throw error;
    }
}
module.exports = {
    viewAllDepartments
};
