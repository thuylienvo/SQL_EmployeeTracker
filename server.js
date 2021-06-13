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
            addDepartment()

        }   else if (selection.whatToDo  === 'add a role') {
            console.log('add a role success');
            // addRole()

        }   else if (selection.whatToDo  === 'add an employee') {
            console.log('add an employee success');
            addEmployee()

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

//============= ARRAYS =============//

var roleArr =[]; 
function selectRole() {
    connection.query('SELECT * FROM role', 
    function(err, res) {
        if (err) throw err 
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title)
        }
    });
    return roleArr;
};

var managerArr =[]; 
function selectManager() {
    connection.query('SELECT * FROM first_name, last_name FROM employee WHERE manager IS NULL', 
    function(err, res) {
        if (err) throw err 
        for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].first_name);
        }
    });
    return managerArr;
};

//============= ADD TO TABLE () =============//
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please enter a department name.',
            validate: department => {
                if (department) {
                  return true;
                } else {
                  console.log('You must enter a department name.');
                  return false;
                }
              }
        },

    ]).then((newDP) => {
        var query = connection.query(`INSERT INTO department SET ?`,
        {
            name: newDP.department
        },
        function(err) {
            if (err) throw err
            console.table(newDP);
            completed ()
        });
    });
};


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Enter employee\'s first name.',
            validate: firstname => {
                if (firstname) {
                  return true;
                } else {
                  console.log('You must enter a first name.');
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter employee\'s last name.',
            validate: lastname => {
                if (lastname) {
                  return true;
                } else {
                  console.log('You must enter a last name.');
                  return false;
                }
              }
        },
        {
            type: 'choice',
            name: 'role',
            message: 'What is their role?',
            choices: selectRole(),
            validate: role => {
                if (role) {
                  return true;
                } else {
                  console.log('You must select a role.');
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?',
            validate: salary => {
                if (salary) {
                  return true;
                } else {
                  console.log('You must enter a salary.');
                  return false;
                }
              }
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?',
            choices: selectManager(),
            validate: manager => {
                if (manager) {
                  return true;
                } else {
                  console.log('You must select a manager.');
                  return false;
                }
              }
        },
    ]).then((addNewRole) => {
        var roleId = selectRole().indexOf(addNewRole.role) + 1;
        var managerId = selectManager().indexOf(addNewRole.choices) + 1
        connection.query(`INSERT INTO employee SET ?`,
        {
            first_name: addNewRole.firstname,
            last_name: addNewRole.lastname,
            role: roleId,
            salary: addNewRole.salary,
            manager: managerId

        },
        function (err, addNewRole) {
          if (err) throw err
          console.table(addNewRole);
          completed ()
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

//============= UPDATE TABLE () =============//

// function updateEmployee() {
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
            addEmployee()

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