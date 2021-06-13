DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;
USE employeeTracker;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT NOT NULL,
  CONSTRAINT fk_department
    FOREIGN KEY (department_id)
        REFERENCES department(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
        REFERENCES role(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE
);
