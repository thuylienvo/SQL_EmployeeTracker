const connection = require('./connection');
const inquirer = require('inquirer');
// const mysql = require('mysql2/promise');


//============= VIEW TABLE () =============//
function viewAllDepartments() {
    connection.query(`SELECT department.id, department.name AS department FROM department`,
    function (err, rows) {
      if (err) throw err
      console.table(rows);
      action();
    })
};

function viewAllRoles() {
    connection.query(`SELECT role.id, role.title, role.salary, 
                department.name AS department FROM role
                LEFT JOIN department ON role.department_id = department.id`,
    function (err, rows) {
        if (err) throw err
        console.table(rows);
        action();
    })
};

function viewAllEmployees() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, 
                department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON manager.id = employee.manager_id`,
    function (err, rows) {
        if (err) throw err
        console.table(rows);
        action();
    })
};

//============= ADD TO TABLE () =============//
// function addDepartment() {
//     let response = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'department',
//             message: 'Please enter the department name.',
//             validate: departmentInput => {
//                 if (departmentInput) {
//                   return true;
//                 } else {
//                   console.log('Please enter a department.');
//                   return false;
//                 }
//               }
//         },
//     ]).then((newDP)
//     )

//     const sql = `INSERT INTO department (name)
//                 VALUE (?)`;
//     connection.query(sql, (err, rows) => {
//       if (err) {
//         console.log(err)
//         return;
//       } 
//       console.table(rows);
//       action();
//     })
// };

// function addRole() {
//     connection.query(`SELECT department.id, department.name AS department FROM department`,
//     function (err, rows) {
//       if (err) throw err
//       console.table(rows);
//       action();
//     })
// };

// function addEmployee() {
//     connection.query(`SELECT department.id, department.name AS department FROM department`,
//     function (err, rows) {
//       if (err) throw err
//       console.table(rows);
//       action();
//     })
// };

//============= DELETE FROM TABLE () =============//


//============= CONTIINUE () =============//
// prompt after a user calls a function and completes the action
function action () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do next?',
            choices: [
                'view all departments', 
                'view all roles', 
                'view all employees', 
                'add a department', 
                'add a role', 
                'add an employee', 
                'update an employee role'],
            name: 'whatToDo'
        },
    ]).then ((selection) => {
        if(selection.whatToDo === 'view all departments') {
            console.log('view all departments success');
            // functions.viewAllDepartments()

        } else if (selection.whatToDo  === 'view all roles') {
            console.log('view all roles success');
            // functions.viewAllRoles()
            
        } else if (selection.whatToDo  === 'view all employees') {
            console.log('view all employees success');
            functions.viewAllEmployees()

        }   else if (selection.whatToDo  === 'add a department') {
            console.log('add a department success');
            // functions.addDepartment()

        }   else if (selection.whatToDo  === 'add a role') {
            console.log('add a role success');
            // functions.addRole()

        }   else if (selection.whatToDo  === 'add an employee') {
            console.log('add an employee success');
            // functions.addEmployee()

        }   else if (selection.whatToDo  === 'update an employee role') {
            console.log('update an employee role success');
            // functions.updateEmployee()

        }  
    });
};

//============= COMPLETE () =============//

module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees};
