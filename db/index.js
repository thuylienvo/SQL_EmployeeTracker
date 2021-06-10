const connection = require('./connection');

function getAllDepartments() {
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err)
        return;
      } 
      console.table(rows)
    })
};

function getAllRoles() {
    const sql = `SELECT * FROM role`;
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err)
        return;
      } 
      console.table(rows)
    })
};

function getAllEmployees() {
    const sql = `SELECT * FROM employee`;
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err)
        return;
      } 
      console.table(rows)
    })
};


module.exports = {getAllRoles, getAllDepartments, getAllEmployees};
