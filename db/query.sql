-- Displays the departments
SELECT department_id AS Id, name AS Name
FROM department;

-- Displays the roles, with the department name
SELECT roles.role_id AS Id, roles.title, department.name AS Department, roles.salary
FROM department
INNER JOIN roles ON  roles.department_id = department.department_id;

-- Displays all managers
SELECT concat(employee.first_name, ' ', employee.last_name) AS 'Manager Name', employee.id, roles.role_id
FROM roles
INNER JOIN employee ON employee.role_id = roles.role_id
WHERE is_management = 1;

-- Displays all the employee contents
SELECT
e1.id,
e1.first_name,
e1.last_name,
roles.title AS title,
department.name AS department,
roles.salary,
CONCAT(e2.first_name, ' ', e2.last_name) AS manager
FROM employee e1
LEFT JOIN employee e2 ON e1.manager_id = e2.id
JOIN roles ON e1.role_id = roles.role_id
JOIN department ON roles.department_id = department.department_id;

-- Display employees and there id's
SELECT id, concat(first_name, ' ', last_name)
FROM employee;

-- Displays all employees with specific manager
SELECT CONCAT(first_name, ' ', last_name) AS employees
FROM employee
WHERE manager_id = 13;

-- View Employees by Department
SELECT CONCAT(first_name, ' ', last_name) AS employee, roles.title, department.name
FROM department
INNER JOIN roles ON roles.department_id = department.department_id
INNER JOIN employee ON employee.role_id = roles.role_id
WHERE department.department_id = 1;

-- View Department Salray
SELECT roles.salary, department.name
FROM department
INNER JOIN roles ON roles.department_id = department.department_id
WHERE roles.department_id = 1