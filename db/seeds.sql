INSERT INTO department (name)
VALUES 
('Kitchen'),
('Management'),
('Floor'),
('Bar');


INSERT INTO role (title, salary, department_id)
VALUES 
('Head Chef', 90000, 1),
('Sous Chef', 82000, 1),
('Founder', 160000, 2),
('Restaurant Manager', 110000, 2),
('Server', 57000, 3),
('Hostess', 55500, 3),
('Mixologist', 63000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Mimi', 'Vo', 3, NULL),
('Gordon', 'Ramsey', 2, 2),
('Bobby', 'Flay', 6, 3),
('David', 'Chang', 1, 2),
('Anthony', 'Bordain', 2, 2),
('Masahuru', 'Morimoto', 7, 3),
('Eric', 'Ripert', 5, 3),
('Aaron', 'Sanchez', 2, 2),
('Andrew', 'Zimmern', 6, 3),
('Julia', 'Child', 4, 1);



INSERT INTO manager (id)
('Mimi Vo'),
('David Chang'),
('Julia Child');

