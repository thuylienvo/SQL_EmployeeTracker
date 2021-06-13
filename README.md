# SQL_EmpoyeeTracker

## Description
CMS application that runs in the command-line and allows its users to view, add, edit, and delete departments, employees and roles.  

![SQL_EmployeeTracker](https://user-images.githubusercontent.com/79684575/121821539-4b2afd00-cc5f-11eb-8c35-f9a4e81d4077.gif)

   See the full demonstation here: https://youtu.be/zFPduUXelnE

  ## Table of Contents

  * [Installation](#installation)
  * [User Story](#userstory)
  * [License](#license)
  * [Questions](#questions)
  
  ## Installation
  To access the application, clone the repo and first run `npm init` the required dependencies as specified in package.json then:

  `npm mysql2`   
  `npm install inquirer`   
  `npm i console.table --save`

  The application can be invoked with npm start.

  ## User Story
  AS A business owner   
  I WANT to be able to view and manage the departments, roles, and employees in my company   
  SO THAT I can organize and plan my business   

  ## Acceptance Criteria 
  GIVEN a command-line application that accepts user input   
  WHEN I start the application   
  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a   role, add an employee, and update an employee role   
  WHEN I choose to view all departments   
  THEN I am presented with a formatted table showing department names and department ids   
  WHEN I choose to view all roles   
  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role   
  WHEN I choose to view all employees   
  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles,    departments, salaries, and managers that the employees report to   
  WHEN I choose to add a department   
  THEN I am prompted to enter the name of the department and that department is added to the database   
  WHEN I choose to add a role   
  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database   
  WHEN I choose to add an employee   
  THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database   
  WHEN I choose to update an employee role   
  THEN I am prompted to select an employee to update and their new role and this information is updated in the database    


  ## License  

  This repo is licensed under the MIT License. (https://opensource.org/licenses/MIT) 

  ## Questions
  For any questions, connect with me at [mimzy414@gmail.com](mailto:mimzy414@gmail.com). 
  
  GitHub: [thuylienvo](https://github.com/thuylienvo) 


