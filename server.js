// PACKAGES 
const inquirer = require('inquirer');
const fs = require('fs');
// const functions = require('./db')
const cTable = require('console.table');
const connection = require('./db/connection');


//======== START APPLICATION FUNCTION ======== //

// PROMPT USER TO SELECT A TABLE TO VIEW OR EDIT
const initApp = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'start',
            message: 'Hello! Let\'s get to creating an Employee Tracker.',
        },
        {
            type: 'list',
            message: 'What would you like to do?',
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
            viewAllDepartments()

        } else if (selection.whatToDo  === 'view all roles') {
            console.log('view all roles success');
            viewAllRoles()
            
        } else if (selection.whatToDo  === 'view all employees') {
            console.log('view all employees success');
            viewAllEmployees()

        }   else if (selection.whatToDo  === 'add a department') {
            console.log('add a department success');
            // addDepartment()

        }   else if (selection.whatToDo  === 'add a role') {
            console.log('add a role success');
            // addRole()

        }   else if (selection.whatToDo  === 'add an employee') {
            console.log('add an employee success');
            // addEmployee()

        }   else if (selection.whatToDo  === 'update an employee role') {
            console.log('update an employee role success');
            // functions.updateEmployee()

        }  
    });
};

//============= VIEW TABLE () =============//
function viewAllDepartments() {
    connection.query(`SELECT department.id, department.name AS department FROM department`,
    function (err, rows) {
      if (err) throw err
      console.table(rows);
      completed();
    })
};

function viewAllRoles() {
    connection.query(`SELECT role.id, role.title, role.salary, 
                department.name AS department FROM role
                LEFT JOIN department ON role.department_id = department.id`,
    function (err, rows) {
        if (err) throw err
        console.table(rows);
        completed ()
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
        completed ()
    })
};

//============= ADD TO TABLE () =============//
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please enter a department name.',
            validate: departmentInput => {
                if (departmentInput) {
                  return true;
                } else {
                  console.log('You must enter a department name.');
                  return false;
                }
              }
        },
    ]).then(function(newDP) {
        var query = connection.query(`INSERT INTO department(name) SET (?)`,
        {
            name: newDP.input
        },
        function(err) {
            if (err) throw err
            console.table(newDP);
            action();
        });
    });
};

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
            viewAllDepartments()

        } else if (selection.whatToDo  === 'view all roles') {
            console.log('view all roles success');
            viewAllRoles()
            
        } else if (selection.whatToDo  === 'view all employees') {
            console.log('view all employees success');
            viewAllEmployees()

        }   else if (selection.whatToDo  === 'add a department') {
            console.log('add a department success');
            addDepartment()

        }   else if (selection.whatToDo  === 'add a role') {
            console.log('add a role success');
            // addRole()

        }   else if (selection.whatToDo  === 'add an employee') {
            console.log('add an employee success');
            // addEmployee()

        }   else if (selection.whatToDo  === 'update an employee role') {
            console.log('update an employee role success');
            // updateEmployee()

        }  
    });
};

//============= COMPLETE () =============//

function completed () {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'complete',
            message: 'Would you like to continue making changes or viewing the employee database?'
        },
    ]).then((res) => {
            if (res.complete === true){
                action();
            } else {
                console.log('Catch you later!')
            }
        });
        };
// FUNCTION TO KICKOFF APP
initApp();