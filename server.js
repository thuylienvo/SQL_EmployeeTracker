// PACKAGES 
const inquirer = require('inquirer');
const fs = require('fs');
const functions = require('./db')


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
            message: 'What would you like to do?()',
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
            functions.getAllDepartments()

        } else if (selection.whatToDo  === 'view all roles') {
            console.log('view all roles success');
            functions.getAllRoles()
            
        } else if (selection.whatToDo  === 'view all employees') {
            console.log('view all employees success');
            functions.getAllEmployees()

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
            // updateEmployee()

        }  
    });
};



// FUNCTION TO KICKOFF APP
initApp();